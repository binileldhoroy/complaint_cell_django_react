from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import *
from .serializers import *


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod                                                                    
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token/',
        'api/token/refresh/',
        'api/signup/',
        'api/personalinfo/',
        'api/profile/',
        'api/newcomplaint/',
    ]
    return Response(routes)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['POST'])
def personalView(request):
    user = request.user
    try:
        people = People.objects.get(people = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    serializers = PersonalInfoSerializer(data=request.data)
    if serializers.is_valid():
        print('success')
        serializers.save(people = people)
        return Response(serializers.data)
    else:
        data = serializers.errors
        return Response(data)

@api_view(['GET'])
def userProfile(request):
    user = request.user
    try:
        people = People.objects.get(people = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    if people.is_people:
        user = request.user
        people = People.objects.get(people = user)
        pinfo = PersonalInfo.objects.get(people = people)
        serializers = PersonalInfoSerializerGet(pinfo)
        return Response(serializers.data)
    else:
        data = {'You are not allow here login as user'}
        return Response(data)



@api_view(['POST'])
def complaintRegistration(request):
    user = request.user
    try:
        people = People.objects.get(people = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    serializers = ComplaintRegistrationSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save(people = people)
        return Response(serializers.data)
    else:
        data = serializers.errors
        return Response(data)

