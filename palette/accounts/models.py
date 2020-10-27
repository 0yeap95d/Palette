from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    gender = models.IntegerField(blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    nickname = models.CharField(max_length=45)
