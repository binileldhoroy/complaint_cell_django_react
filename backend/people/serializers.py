from requests import delete
from rest_framework import serializers 
from django.contrib.auth.password_validation import validate_password
from people.models import *

from lawyer.models import *


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    phone=serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('first_name','email','last_name','username','password', 'password2','phone')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        if People.objects.filter(phone=attrs['phone']).exists():
            raise serializers.ValidationError(
                {"number": "Number already exits."})

        return attrs
    

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],first_name=validated_data['first_name'],last_name=validated_data['last_name'],email=validated_data['email'],is_active=False
        )

        user.set_password(validated_data['password'])
        user.save()
        People.objects.create(people=user,phone=validated_data['phone'])

        return user


class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        fields = '__all__'


class PeopleInfoGet(serializers.ModelSerializer):
    people = RegisterSerializer()
    class Meta:
        model = People
        fields = '__all__'

class UserInfo(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name','email','last_name')


class PersonalInfoSerializerGet(serializers.ModelSerializer):
    people = PeopleInfoGet()
    class Meta:
        model = PersonalInfo
        fields = '__all__'

class ComplaintRegistrationSerializer(serializers.ModelSerializer):
    people = PeopleInfoGet()
    class Meta:
        model = ComplaintRegistration
        fields = '__all__'


class RegistrationComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplaintRegistration
        fields = '__all__'

class LawyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','first_name','last_name','email')
       

class LawyerListSerializer(serializers.ModelSerializer):
    lawyer = LawyerSerializer()
    class Meta:
        model = Lawyer
        fields = ('lawyer','phone','enrollment_number','lawyer_image')

class LawyerPersonalInfoSerializer(serializers.ModelSerializer):
    lawyer_id = LawyerSerializer()
    class Meta:
        model = LawyerPersonalInfo
        fields = '__all__' 


class AssignedComplaintsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignedComplaints
        fields = '__all__'


class PoliceDistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliceDistrict
        fields = '__all__'

class PoliceStationSerializer(serializers.ModelSerializer):
    police_district = PoliceDistrictSerializer()
    class Meta:
        model = PoliceStation
        fields = '__all__'