from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class People(models.Model):
    people = models.OneToOneField(User,on_delete=models.CASCADE,null=True)
    phone = models.BigIntegerField(unique=True,null=True)
    is_people = models.BooleanField(default=True)



gender = [
    ('Male','Male'),
    ('Female','Female'),
    ('Transgender','Transgender'),
]
relative_type = [
    ('Father','Father'),
    ('Mother' ,'Mother'),
    ('Guardin' ,'Guardin'),
    ('Husband' ,'Husband'),
    ('Wife' ,'Wife')

]

proof_type = [
    ('AADHAR CARD','AADHAR CARD'),
    ('Income Tax(PAN) Card','Income Tax(PAN) Card'),
    ('Voter Card','Voter Card'),
    ('Driving License','Driving License'),
    ('Passport','Passport'),
    ('Ration Card','Ration Card'),

]

class PersonalInfo(models.Model):
    people = models.OneToOneField(People,on_delete=models.CASCADE,null=True)
    dob = models.DateField()
    gender = models.CharField(max_length=100, choices=gender,null=True)
    relative_name = models.CharField(max_length=100,null=True)
    relative_type = models.CharField(max_length=100,choices=relative_type,null=True)
    proof_type = models.CharField(max_length=100,choices=proof_type,null=True)
    proof_number = models.CharField(max_length=100,null=True)
    house_name = models.CharField(max_length=100,null=True)
    house_number = models.CharField(max_length=100,null=True)
    street = models.CharField(max_length=100,null=True)
    locality = models.CharField(max_length=100,null=True)
    pin_code = models.IntegerField(null=True)
    village = models.CharField(max_length=100,null=True)
    country = models.CharField(max_length=100,null=True)
    state = models.CharField(max_length=100,null=True)
    police_district = models.CharField(max_length=100,null=True)
    police_station = models.CharField(max_length=100,null=True)