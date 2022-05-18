from rest_framework import serializers 
from django.contrib.auth.password_validation import validate_password
from .models import *


class LawyerRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    enrollment_number = serializers.CharField(write_only=True, required=True)
    phone=serializers.CharField(write_only=True, required=True)
    lawyer_image = serializers.ImageField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('first_name','last_name','email','username','password', 'password2','enrollment_number','phone','lawyer_image')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        if Lawyer.objects.filter(phone=attrs['phone']).exists():
            raise serializers.ValidationError(
                {"number": "Number already exits."})
        if Lawyer.objects.filter(enrollment_number=attrs['enrollment_number']).exists():
            raise serializers.ValidationError(
                {"enrollment": "User already exits with this enrollment number."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()
        Lawyer.objects.create(lawyer=user,enrollment_number=validated_data['enrollment_number'],
        phone=validated_data['phone'],lawyer_image=validated_data['lawyer_image'])

        return user


class LawyerPersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LawyerPersonalInfo
        fields = '__all__'

class LawyerOfficeSerializer(serializers.ModelSerializer):
    # office = LawyerRegisterSerializer()
    class Meta:
        model = OfficeAddress
        fields = '__all__'

class LawyerGetSerializer(serializers.ModelSerializer):
    lawyer = LawyerRegisterSerializer()
    class Meta:
        model = Lawyer
        fields = '__all__'

class LawyerProfileGetSerializer(serializers.ModelSerializer):
    lawyer_id = LawyerGetSerializer()
    class Meta:
        model = LawyerPersonalInfo
        fields = '__all__'