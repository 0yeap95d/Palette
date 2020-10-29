from django.shortcuts import render, get_object_or_404
from django.conf import settings
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse, Http404
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

from .models import Emotion, Question
from .serializers import EmotionSerializer, QuestionSerializer

import sqlite3, datetime
User = get_user_model()

import json, pandas
import random
import datetime
from datetime import datetime

from keras.preprocessing import image
from keras.models import model_from_json
import os
import cv2
import numpy as np
import logging
import time
# 검사결과(제일 최근결과) 높은 감정 3개
@api_view(['GET'])
def top(request):
    emotion = Emotion.objects.all().filter(userNo=request.GET.get('userNo')).order_by('-date')[:1]
    per = []
    idx = []
    for emo in emotion:
        arr = []
        arr.append(emo.mood1)
        arr.append(emo.mood2)
        arr.append(emo.mood3)
        arr.append(emo.mood4)
        arr.append(emo.mood5)
        arr.append(emo.mood6)
        arr.append(emo.mood7)
        arr2 = arr[:]
        arr.sort(reverse=True)
        per.append(arr[0])
        per.append(arr[1])
        per.append(arr[2])
        fr = arr2.index(arr[0])
        se = arr2.index(arr[1])
        th = arr2.index(arr[2])
        if se==fr:
            se = arr2.index(arr[1],fr+1,7)
        if th==fr or th==se:
            th = arr2.index(arr[2],se+1,7)
        idx.append(fr)
        idx.append(se)
        idx.append(th)
        
    result = [[idx[0],per[0]],[idx[1],per[1]],[idx[2],per[2]]]
    
    return Response({
        'result' : result
    })

# 성별, 연령대, 시간으로 통계낸 감정 순위 3개
@api_view(['GET'])
def statistics(request):
    emotion = Emotion.objects.all().filter(userNo=request.GET.get('userNo')).order_by('-date')[:1]
    user = User.objects.all().filter(pk=request.GET.get('userNo'))
    gender = user[0].gender
    age = user[0].age
    time = emotion[0].date
    date_str = time.strftime("%Y-%m-%d %H:%M:%S")
    time = (str)(date_str)
    time = int(time[11:13])/3
    accounts = User.objects.all().filter(gender=gender, age=age)
    cnt = [0,0,0,0,0,0,0]
    for ac in accounts:
        emotions = Emotion.objects.all().filter(userNo=ac.pk)
        for emo in emotions:
            tm = emo.date
            tm = (str)(tm.strftime("%Y-%m-%d %H:%M:%S"))
            tm = int(tm[11:13])/3
            if int(time)!=int(tm):
                continue
            arr = []
            arr.append(emo.mood1)
            arr.append(emo.mood2)
            arr.append(emo.mood3)
            arr.append(emo.mood4)
            arr.append(emo.mood5)
            arr.append(emo.mood6)
            arr.append(emo.mood7)
            arr2 = arr[:]
            arr.sort(reverse=True)
            cnt[arr2.index(arr[0])] += 1
    cnt2 = cnt[:]
    cnt2.sort(reverse=True)
    fr = cnt.index(cnt2[0])
    se = cnt.index(cnt2[1])
    th = cnt.index(cnt2[2])
    if se==fr:
        se = cnt.index(cnt2[1],fr+1,7)
    if th==fr or th==se:
        th = cnt.index(cnt2[2],se+1,7)
    idx = [fr,se,th]
    return Response({
        'idx' : idx,
        'age' : age,
        'gneder' : gender,
        'time' : int(time)
        })

# 검사결과 일마다 날짜마다 결과
@api_view(['GET'])
def calendar(request):
    emotion = Emotion.objects.all().filter(userNo=request.GET.get('userNo')).order_by('date')
    et=[]
    t = ''
    for emo in emotion:
        time = emo.date
        date_str = time.strftime("%Y-%m-%d %H:%M:%S")
        time = (str)(date_str)
        time = time[0:10]
        if t==time:
            continue
        t=time

        arr = []
        arr.append(emo.mood1)
        arr.append(emo.mood2)
        arr.append(emo.mood3)
        arr.append(emo.mood4)
        arr.append(emo.mood5)
        arr.append(emo.mood6)
        arr.append(emo.mood7)
        arr2 = arr[:]
        arr.sort(reverse=True)
        fr = arr2.index(arr[0])

        cl=[time, fr]
        et.append(cl)

    return Response({'emotions': et})


# 결과 저장하면서 그 결과 보내주기
@api_view(['POST'])
def save(request):
    #load model
    print(__file__)
    print(os.path.realpath(__file__))
    print(os.path.abspath(__file__))
    model = model_from_json(open('./models/fer.json', 'r').read())
    #load weights
    model.load_weights('./models/fer.h5')
    face_haar_cascade = cv2.CascadeClassifier('./models/haarcascade_frontalface_default.xml')

    cap=cv2.VideoCapture('./models/baby.mp4')

    emotions = ('angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral')
    emotionValues = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

    begin_time = time.time()

    while(cap.isOpened()):

        ret,test_img=cap.read()# captures frame and returns boolean value and captured image
        if not ret:
            continue
        gray_img= cv2.cvtColor(test_img, cv2.COLOR_BGR2GRAY)

        faces_detected = face_haar_cascade.detectMultiScale(gray_img, 1.32, 5)


        for (x,y,w,h) in faces_detected:
            cv2.rectangle(test_img,(x,y),(x+w,y+h),(255,0,0),thickness=7)
            roi_gray=gray_img[y:y+w,x:x+h]#cropping region of interest i.e. face area from  image
            roi_gray=cv2.resize(roi_gray,(48,48))
            img_pixels = image.img_to_array(roi_gray)
            img_pixels = np.expand_dims(img_pixels, axis = 0)
            img_pixels /= 255

            predictions = model.predict(img_pixels)

            #find max indexed array
            max_index = np.argmax(predictions[0])
            max_value = np.max(predictions[0])


            # netural 감정이 최고값이 아닐때,
            if (max_index != 6):
                for i in range(len(emotions)):
                    emotionValues[i] += predictions[0][i]
            else:
                logging.warning("except neutral")

            predicted_emotion = emotions[max_index]

            logging.warning(predicted_emotion)
            logging.warning(max_value)
            logging.warning(emotionValues)

            cv2.putText(test_img, predicted_emotion + str(max_value) + "%", (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)

        resized_img = cv2.resize(test_img, (1000, 700))
        cv2.imshow('Facial emotion analysis ',resized_img)


        if cv2.waitKey(10) == ord('q'):
            # cv2.destroyAllWindows
            cap.release()
            break

        # timer
        process_time = time.time() - begin_time
        if (process_time > 10):
            # cv2.destroyAllWindows
            cap.release()
            break

    # cap.release()
    # cv2.destroyAllWindows


    # 총 감정 분석해줄 영상 받기
    pk = request.data.get('userNo')
    user = get_object_or_404(User, pk=pk)
    mood1 = 10
    mood2 = 5
    mood3 = 20
    mood4 = 5
    mood5 = 30
    mood6 = 0
    mood7 = 30
    emotion = Emotion.objects.create(
        userNo = user,
        mood1 = mood1,
        mood2 = mood2,
        mood3 = mood3,
        mood4 = mood4,
        mood5 = mood5,
        mood6 = mood6,
        mood7 = mood7,
    )
    emotion.save()

    em = Emotion.objects.all().filter(userNo=pk).order_by('-date')[:1]

    per = []
    idx = []
    arr = []
    arr.append(em[0].mood1)
    arr.append(em[0].mood2)
    arr.append(em[0].mood3)
    arr.append(em[0].mood4)
    arr.append(em[0].mood5)
    arr.append(em[0].mood6)
    arr.append(em[0].mood7)
    arr2 = arr[:]
    arr.sort(reverse=True)
    per.append(arr[0])
    per.append(arr[1])
    per.append(arr[2])
    fr = arr2.index(arr[0])
    se = arr2.index(arr[1])
    th = arr2.index(arr[2])
    if se==fr:
        se = arr2.index(arr[1],fr+1,7)
    if th==fr or th==se:
        th = arr2.index(arr[2],se+1,7)
    idx.append(fr)
    idx.append(se)
    idx.append(th)
    
    result = [[idx[0],per[0]],[idx[1],per[1]],[idx[2],per[2]]]
    
    return Response({
        'result' : result,
    })

# 질문에 대한 대답받으면 그 감정에 맞는 질문 뱉어주기
@api_view(['POST'])
def question(request):
    # 대답하는 파일 받기
    pk = request.data.get('userNo')
    user = get_object_or_404(User, pk=pk)
    mood1 = 10
    mood2 = 5
    mood3 = 30
    mood4 = 5
    mood5 = 20
    mood6 = 0
    mood7 = 30
    
    arr = []
    arr.append(mood1)
    arr.append(mood2)
    arr.append(mood3)
    arr.append(mood4)
    arr.append(mood5)
    arr.append(mood6)
    arr.append(mood7)
    arr2 = arr[:]
    arr.sort(reverse=True)
    idx = arr2.index(arr[0])    #  가장 높은 감정

    # 해당 감정에 맞는 질문 랜덤으로 쏘기
    ques = Question.objects.all()
    cnt = Question.objects.all().filter(moodType=idx).count()
    random_index = int(random.random()*cnt)
    random_que = ques[random_index] 
    
    return Response({
        'result' : cnt,
        'que' : random_que.question
    })
