from django.db import models

from django.contrib.auth.models import AbstractUser
# Create your models here.

class People(AbstractUser):
    phone = models.BigIntegerField(unique=True,null=True)
    is_people = models.BooleanField(default=True)
