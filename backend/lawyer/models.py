from django.db import models
from django.contrib.auth.models import User

from people.models import gender
from people.utils import path_and_rename
# Create your models here.


class Lawyer(models.Model):
    lawyer = models.OneToOneField(User,on_delete=models.CASCADE,null=True)
    phone = models.BigIntegerField(unique=True,null=True)
    enrollment_number = models.BigIntegerField(unique=True,null=True)
    lawyer_image = models.ImageField(upload_to=path_and_rename,null=True)
    is_lawyer = models.BooleanField(default=True)
    is_hire = models.BooleanField(default=False)

    def __str__(self):
        return str(self.lawyer)



class LawyerPersonalInfo(models.Model):
    lawyer_id = models.OneToOneField(Lawyer,on_delete=models.CASCADE)
    gender = models.CharField(max_length=50,choices=gender,null=True)
    degree = models.CharField(max_length=200,null=True)
    area_practice = models.CharField(max_length=200,null=True)
    language = models.CharField(max_length=150,null=True)
    experience = models.CharField(max_length=50,null=True)
    court = models.CharField(max_length=150,null=True)
    bar_name = models.CharField(max_length=150,null=True)
    description = models.TextField(null=True)
    file_cv = models.FileField(upload_to=path_and_rename,null=True)


class OfficeAddress(models.Model):
    office = models.OneToOneField(Lawyer,on_delete=models.CASCADE,null=True)
    firm_name = models.CharField(max_length=150,null=True)
    office_address = models.CharField(max_length=150,null=True)
    office_state = models.CharField(max_length=150,null=True)
    office_city = models.CharField(max_length=150,null=True)
    office_district = models.CharField(max_length=150,null=True)
    consulten_fee = models.IntegerField(null=True)

