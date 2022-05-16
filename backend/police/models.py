import imp
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

from people.models import ComplaintRegistration, People

class Police(models.Model):
    police = models.OneToOneField(User,on_delete=models.CASCADE,null=True)
    officer_incharge = models.CharField(max_length=100,null=True)
    officer_position = models.CharField(max_length=100,null=True)
    ps_district = models.CharField(max_length=100,null=True)
    ps_place = models.CharField(max_length=100,null=True)
    phone = models.IntegerField(unique=True,null=True)
    is_police = models.BooleanField(default=True,null=True)


class AddNote(models.Model):
    police = models.ForeignKey(Police,on_delete=models.SET_NULL,null=True)
    complaint = models.ForeignKey(ComplaintRegistration,on_delete=models.SET_NULL,null=True)
    note = models.CharField(max_length=150,null=True)
    created = models.DateTimeField(auto_now_add=True,null=True)

    class Meta:
        ordering = ('-created',)
