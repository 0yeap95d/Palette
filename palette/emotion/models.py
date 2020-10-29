from django.db import models
from django.conf import settings

class Emotion(models.Model):
    userNo = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='emotion')
    mood1 = models.FloatField()
    mood2 = models.FloatField()
    mood3 = models.FloatField()
    mood4 = models.FloatField()
    mood5 = models.FloatField()
    mood6 = models.FloatField()
    mood7 = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)

class Result(models.Model):
    moodType = models.IntegerField(blank=True, null=True)
    resultType = models.IntegerField(blank=True, null=True)
    content = models.CharField(max_length=100)

class Question(models.Model):
    moodType = models.IntegerField(blank=True, null=True)
    question = models.CharField(max_length=150)
