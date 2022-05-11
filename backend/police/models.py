from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Police(models.Model):
    police = models.OneToOneField(User,on_delete=models.CASCADE,null=True)
    officer_incharge = models.CharField(max_length=100,null=True)
    officer_position = models.CharField(max_length=100,null=True)
    ps_district = models.CharField(max_length=100,null=True)
    ps_place = models.CharField(max_length=100,null=True)
    phone = models.IntegerField(unique=True,null=True)
    is_police = models.BooleanField(default=True,null=True)
