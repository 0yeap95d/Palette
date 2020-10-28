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



# @api_view(['POST'])
# def file(request):
    
#     return Response({})
