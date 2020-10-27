from django.shortcuts import render, redirect, get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse, Http404
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

from .models import User
from .serializers import UserSerializer

import sqlite3, datetime

# AI model
from keras.models import load_model
from keras.preprocessing import image
import tensorflow as tf
from tensorflow import Graph, Session

import json, pandas

@api_view(['GET'])
def userinfo(request, user_pk):
    user = get_object_or_404(User, pk=user_pk)
    serializer = UserSerializer(user)

    return Response({'user' : serializer.data})

@api_view(['PUT'])
def updated(request):
    print(request.data)
    pk = request.data['params']['pk']
    user = get_object_or_404(User, pk=pk)

    user.gender = request.data['params']['gender']
    user.age = request.data['params']['age']
    user.nickname = request.data['params']['nickname']
    user.save()

    user = get_object_or_404(User, pk=pk)

    serializer = UserSerializer(user)

    return Response({'user' : serializer.data})

@csrf_exempt
def checked(request):
    uName = request.body.decode('utf-8')
    name = json.loads(uName)
    checkName = name['username']
    user = User.objects.filter(username=checkName)
    if user:
        data = UserSerializer(user[0])
        return HttpResponse(data, status=200)

    else:
        return HttpResponse(status=400)

@csrf_exempt
def initinfo(request, user_pk):

    request = json.loads(request.body)

    gender = request['gender']
    age = int(request['age'])
    nickname = request['nickname']

    user = get_object_or_404(User, pk=user_pk)
    user.nickname = nickname
    user.gender = gender
    user.age = age
    user.save()

    serializer = UserSerializer(user)
    return JsonResponse(serializer.data)

@api_view(['POST'])
@csrf_exempt
def test(request):
    print(request.data['age'])
    print(request.data['gender'])
    print(request.data['nickname'])
    # age = request.POST['age']
    # gender = request.POST['gender']
    # nickname = request.POST['nickname']

    # print(age)
    # print(gender)
    # print(nickname)
    return HttpResponse('success', status=200)


@api_view(['GET'])
def test2(request):
    
    return Response(serializer.data)
