from dataclasses import field
from rest_framework.serializers import ModelSerializer
from people.models import People

class PeopleSerializer(ModelSerializer):
    class Meta:
        model = People
        fields = ['first_name','last_name','username','phone','email','password']
