from django.db import models
from django.contrib.auth.models import User
# Create your models here.

from .utils import generateRefCode

class People(models.Model):
    people = models.OneToOneField(User,on_delete=models.CASCADE,null=True)
    phone = models.BigIntegerField(unique=True,null=True)
    is_people = models.BooleanField(default=True)

    def __str__(self):
        return str(self.people)


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


compalaint_type = [
    ('Against Public','Against Public'),
    ('Against Organization','Against Organization'),
    ('Against Police Officer','Against Police Officer'),
    ('Against Publice Servent','Against Publice Servent'),
    ('Wild Life Case','Wild Life Case'),
    ('Against Department','Against Department'),
    ('CYBER CRIME','CYBER CRIME')
]

comp_status_type = [
    ('Registred','Registred'),
    ('Opened','Opened'),
    ('Closed','Closed')
]

case_status = [
    ('Opened','Opened'),
    ('FIR Registred','FIR Registred'),
    ('Disposed','Disposed')
]

class ComplaintRegistration(models.Model):
    people = models.ForeignKey(People,on_delete=models.SET_NULL,null=True)
    complaint_nature = models.CharField(max_length=150,choices=compalaint_type,null=True)
    incident_place = models.CharField(max_length=150,null=True)
    police_district = models.CharField(max_length=150,null=True)
    police_place = models.CharField(max_length=150,null=True)
    incident_date = models.DateTimeField(null=True)
    file_discription = models.CharField(max_length=150,null=True)
    file_upload = models.FileField(upload_to='media',null=True)
    compalaint_description = models.TextField(null=True)
    complaint_status = models.CharField(max_length=150,choices=comp_status_type,null=True,default='Registred')
    case_status  = models.CharField(max_length=150,choices=case_status,null=True)
    ref_number = models.CharField(max_length=12,blank=True,null=True)

    def __str__(self):
        return self.complaint_nature

    
    def save(self, *args, **kwargs):
        if self.ref_number == '' and self.ref_number == None:
            ref_number = generateRefCode()
            self.ref_number = ref_number
        super().save(*args, **kwargs)