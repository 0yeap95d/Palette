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

from .models import Emotion
from .serializers import EmotionSerializer

import sqlite3, datetime
User = get_user_model()

import json, pandas

import datetime
from datetime import datetime
# Create your views here.
# @api_view(['GET'])
# def top(request):
#     # print(request.GET)
#     pk = request.GET.get('pk')
#     month = request.GET.get('month')
#     # print(pk, month)
#     memo = Diary.objects.all().filter(userNo=pk, diaryDate__startswith=month).order_by('diaryDate')
#     ate_food = Eat.objects.all().filter(userNo=pk, date__startswith=month).order_by('date')
#     body = Body.objects.all().filter(userNo=pk).exclude(bodyImg__isnull=True).exclude(bodyImg__exact='').order_by('bodyDate')
#     memo_data = DiarySerializer(memo, many=True)
#     ate_food_data = EatSerializer(ate_food, many=True)
#     body_data = BodySerializer(body, many=True)
#     return Response({'all_memo_data': memo_data.data, 'all_food_data':ate_food_data.data, 'all_body_data': body_data.data})

# @csrf_exempt

# 검사결과(제일 최근결과) 높은 감정 3개
@api_view(['GET'])
def top(request):
    # print(request.GET)
    # pk = request.GET.get('pk')
    # memo = Diary.objects.all().filter(userNo=pk, diaryDate__startswith=month).order_by('diaryDate')
    # memo_data = DiarySerializer(memo, many=True)
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
        arr.append(emo.mood8)
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
    # context = {
    #     'emotions' : emotion,
    #     'per' : per,
    #     'idx' : idx

    # }

    # print(context)
    # return render(request, 'top.html', context)
    # emotion_data = EmotionSerializer(emotion, many=True)
    return Response({
        # 'emotions' : emotion,
        'per' : per,
        'idx' : idx
        })

# 성별, 연령대, 시간으로 통계낸 감정 순위 3개
@api_view(['GET'])
def statistics(request):
    # print(request.GET)
    emotion = Emotion.objects.all().filter(userNo=request.GET.get('userNo')).order_by('-date')[:1]
    user = User.objects.all().filter(pk=request.GET.get('userNo'))
    gender = user[0].gender
    age = user[0].age
    time = emotion[0].date
    date_str = time.strftime("%Y-%m-%d %H:%M:%S")
    time = (str)(date_str)
    time = int(time[11:13])/3
    # print(gender)
    # print(age)
    # print('time-----')
    # print(int(time))
    age = int(age/10)
    accounts = User.objects.all().filter(gender=gender, age__range=(age*10,age*10+9))
    # print(accounts)
    cnt = [0,0,0,0,0,0,0,0]
    for ac in accounts:
        emotions = Emotion.objects.all().filter(userNo=ac.pk)
        for emo in emotions:
            tm = emo.date
            tm = (str)(tm.strftime("%Y-%m-%d %H:%M:%S"))
            tm = int(tm[11:13])/3
            # print('time2-----')
            # print(int(tm))
            # print(emo.date)
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
            arr.append(emo.mood8)
            arr2 = arr[:]
            arr.sort(reverse=True)
            cnt[arr2.index(arr[0])] += 1
    cnt2 = cnt[:]
    cnt2.sort(reverse=True)
    # print(cnt)
    # print(cnt2)
    fr = cnt.index(cnt2[0])
    se = cnt.index(cnt2[1])
    th = cnt.index(cnt2[2])
    if se==fr:
        se = cnt.index(cnt2[1],fr+1,7)
    if th==fr or th==se:
        th = cnt.index(cnt2[2],se+1,7)
    # print(fr)
    # print(se)
    # print(th)
    idx = [fr,se,th]
    # print(gender)
    # print(age)
    # context = {
    #     'emotions' : emotion,
    #     'idx' : idx
    # }
    # print(context)
    # return render(request, 'top.html', context)
    # emotion_data = EmotionSerializer(emotion, many=True)
    startage = age*10
    endage = age*10+9
    return Response({
        'idx' : idx,
        'startage' : startage,
        'endage' : endage,
        'gneder' : gender,
        'time' : int(time)
        })

# 검사결과 일마다 날짜마다 결과
@api_view(['GET'])
def calendar(request):
    # print(request.GET)
    # emotion = Emotion.objects.all().filter(userNo=2).order_by('-date')[:1]
    emotion = Emotion.objects.all().filter(userNo=request.GET.get('userNo')).order_by('date')
    et=[]
    t = ''
    for emo in emotion:
        time = emo.date
        date_str = time.strftime("%Y-%m-%d %H:%M:%S")
        time = (str)(date_str)
        time = time[0:10]
        # print(emo)
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
        arr.append(emo.mood8)
        arr2 = arr[:]
        arr.sort(reverse=True)
        fr = arr2.index(arr[0])

        cl=[time, fr]
        et.append(cl)
    # memo = Diary.objects.all().filter(userNo=pk, diaryDate__startswith=month).order_by('diaryDate')
    # memo_data = DiarySerializer(memo, many=True)
    # context = {
    #     'emotions' : et,
    # }
    # print(context)
    # return render(request, 'calendar.html', context)
    # emotion_data = EmotionSerializer(emotion, many=True)
    return Response({'emotions': et})


