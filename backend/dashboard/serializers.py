from rest_framework import serializers 
from django.contrib.auth.models import User
from .models import *

from people.models import People
from lawyer.models import Lawyer,LawyerPersonalInfo


class GetRegistredUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','first_name','last_name','username','email','is_active')

class GetUserSerializer(serializers.ModelSerializer):
    people = GetRegistredUserSerializer()
    class Meta:
        model = People
        fields = '__all__'


class GetLawyerSerializer(serializers.ModelSerializer):
    lawyer = GetRegistredUserSerializer()
    class Meta:
        model = Lawyer
        fields = '__all__'


class GetLawyerProfileSerializer(serializers.ModelSerializer):
    lawyer_id = GetLawyerSerializer()
    class Meta:
        model = LawyerPersonalInfo
        fields = '__all__'