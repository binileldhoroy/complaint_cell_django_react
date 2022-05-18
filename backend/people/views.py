from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import *
from .serializers import *

from lawyer.models import Lawyer,LawyerPersonalInfo
from dashboard.serializers import GetLawyerProfileSerializer


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
        'api/view-lawyers/',
        'api/lawyers-details/<str:pk>',
    ]
    return Response(routes)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def personalView(request):
    if request.user.is_active:
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
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userProfile(request):
    if request.user.is_active:
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
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complaintRegistration(request):
    if request.user.is_active:
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
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewLawyers(request):
    if request.user.is_active:
        user = request.user
        try:
            people = People.objects.get(people = user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        pinfo = PersonalInfo.objects.get(people = people)
        dist = pinfo.police_district
        lawyers = Lawyer.objects.filter(is_hire = True)
        dict_lawyers = lawyers.filter(officeaddress__office_city__contains = dist)
        non_dict_lawyers = lawyers.exclude(officeaddress__office_city__contains = dist)
        # l = dict_lawyers + non_dict_lawyers
        lawyer_list1 = LawyerListSerializer(dict_lawyers,many=True)
        lawyer_list = LawyerListSerializer(non_dict_lawyers,many=True)
        return Response({"on_district":lawyer_list1.data,"non_district":lawyer_list.data})
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewLawyerDetails(request,pk):
    if request.user.is_active:
        user = User.objects.get(id = pk)
        lawyer = Lawyer.objects.get(lawyer = user)
        try:
            pinfo = LawyerPersonalInfo.objects.get(lawyer_id = lawyer)
        except:
            data = {'status':'Lawyer didnt complete the profile'}
            return Response(data)
        serializers = GetLawyerProfileSerializer(pinfo)
        return Response(serializers.data)
    else:
        data = {'status':'You are not allowed here'}
        return Response(data)