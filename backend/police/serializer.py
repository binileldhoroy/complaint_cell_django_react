from rest_framework import serializers 
from django.contrib.auth.password_validation import validate_password

from .models import *

from people.models import ComplaintRegistration
from people.serializers import PeopleInfoGet


class PoliceRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    phone=serializers.CharField(write_only=True, required=True)
    officer_incharge=serializers.CharField(write_only=True, required=True)
    officer_position=serializers.CharField(write_only=True, required=True)
    ps_district=serializers.CharField(write_only=True, required=True)
    ps_place=serializers.CharField(write_only=True, required=True)


    class Meta:
        model = User
        fields = ('email','username','password', 'password2','officer_incharge','officer_position','ps_district','ps_place','phone')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        if Police.objects.filter(phone=attrs['phone']).exists():
            raise serializers.ValidationError(
                {"number": "Number already exits."})
        if Police.objects.filter(ps_place=attrs['ps_place']).exists():
            raise serializers.ValidationError(
                {"Place": "Police station registered in this place"})


        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()
        Police.objects.create(police=user,phone=validated_data['phone'],
        officer_incharge=validated_data['officer_incharge'],officer_position=validated_data['officer_position'],
        ps_district=validated_data['ps_district'],ps_place=validated_data['ps_place'])

        return user


class GetComplaints(serializers.ModelSerializer):
    people = PeopleInfoGet()
    class Meta:
        model = ComplaintRegistration
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddNote 
        fields = '__all__'