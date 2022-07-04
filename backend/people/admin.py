from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(People)
admin.site.register(PersonalInfo)
admin.site.register(ComplaintRegistration)
admin.site.register(PoliceDistrict)
admin.site.register(PoliceStation)
admin.site.register(AssignedComplaints)
admin.site.register(PaymentRequest)