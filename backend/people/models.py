from django.db import models
from django.contrib.auth.models import User
# Create your models here.

from .utils import generateRefCode,path_and_rename
from lawyer.models import Lawyer

class People(models.Model):
    people = models.OneToOneField(User,on_delete=models.CASCADE,null=True)
    phone = models.BigIntegerField(unique=True,null=True)
    is_people = models.BooleanField(default=True)
    complete_profile = models.BooleanField(default=False)

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
    user_image = models.ImageField(upload_to=path_and_rename,null=True)
    pinfo_complete = models.BooleanField(default=False)


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
    file_upload = models.FileField(upload_to=path_and_rename,null=True)
    compalaint_description = models.TextField(null=True)
    complaint_status = models.CharField(max_length=150,choices=comp_status_type,null=True,default='Registred')
    case_status  = models.CharField(max_length=150,choices=case_status,null=True)
    ref_number = models.CharField(max_length=12,blank=True,null=True)
    requested_date = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    forwarded = models.BooleanField(default=False,null=True)

    def __str__(self):
        return self.complaint_nature

    def save(self, *args, **kwargs):
        if self.ref_number == '' or self.ref_number == None:
            number = generateRefCode()
            self.ref_number = number
            print(number)
        super().save(*args, **kwargs)



class AssignedComplaints(models.Model):
    people = models.ForeignKey(People,on_delete=models.CASCADE,null=True)
    lawyer = models.ForeignKey(Lawyer, on_delete=models.CASCADE,null=True)
    complaint = models.ForeignKey(ComplaintRegistration,on_delete=models.CASCADE,null=True)
    is_accept = models.BooleanField(default=False)
    request_date = models.DateTimeField(auto_now_add=True,blank=True,null=True)



class PoliceDistrict(models.Model):
    police_district = models.CharField(max_length=100,null=True,unique=True)

    def __str__(self):
        return self.police_district

class PoliceStation(models.Model):
    police_district = models.ForeignKey(PoliceDistrict,on_delete=models.CASCADE,null=True)
    police_station = models.CharField(max_length=100,null=True,unique=True)

    def __str__(self):
        return self.police_station

payment_status = [
    ('completed','completed'),
    ('pending','pending'),
]

class PaymentRequest(models.Model):
    lawyer_id = models.ForeignKey(Lawyer,on_delete=models.CASCADE,null=True)
    people = models.ForeignKey(People,on_delete=models.CASCADE,null=True)
    complaint = models.ForeignKey(ComplaintRegistration,on_delete=models.CASCADE,null=True)
    amount = models.IntegerField(null=True)
    date = models.DateField(null=True)
    payment_type = models.CharField(max_length=150,null=True)
    payment_status = models.CharField(max_length=150,null=True, choices=payment_status)
    payment_date = models.DateField(null=True,blank=True)
    payment_id = models.CharField(max_length=150,null=True,blank=True)
    is_paid = models.BooleanField(default=False)