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

from police.models import Police
from django.http import HttpResponse

from decouple import config
from twilio.rest import Client


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod                                                                    
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        try:
            people = People.objects.get(people = user)
            userType = 'is_user'
        except:
            userType = None

        if userType == None:
            try:
                people = Lawyer.objects.get(lawyer = user)
                userType = 'is_lawyer'
            except:
                userType = None

        if userType == None:
            try:
                people = Police.objects.get(police = user)
                userType = 'is_police'
            except:
                userType = None

        if userType == None and user.is_superuser:
            userType = 'is_superuser'


        token['type'] = userType
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
        'api/accepted-complaints/',
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
            serializers.save(people = people,pinfo_complete=True)
            People.objects.filter(people = user).update(complete_profile=True)
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

        # try:
        profile_complete = PersonalInfo.objects.filter(people = people)
        # except:
        #     profile_complete = {'pinfo_complete' : False}
        #     # profile_complete.pinfo_complete = False
        if len(profile_complete) == 0:
            profile_get = False
        else:
            profile_get = True

        if profile_get:
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
            serializer = PeopleInfoGet(people)
            return Response(serializer.data)
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
        name = UserInfo(user)
        profile_complete = PersonalInfo.objects.get(people = people)
        if profile_complete.pinfo_complete:
            serializers = RegistrationComplaintSerializer(data=request.data)
            if serializers.is_valid():
                serializers.save(people = people)
                return Response({'responce':serializers.data,'profile':name.data})
            else:
                data = serializers.errors
                return Response(data)
        else:
            data = {'profile not completed'}
            return Response(data)
    else:
        data = {'Your account is blocked by Admin '}
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def acceptComplaintUser(request):
    if request.user.is_active:
        user = request.user
        try:
            people = People.objects.get(people = user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        complaint = ComplaintRegistration.objects.filter(people = people, case_status = 'FIR Registred')
        serializer = ComplaintRegistrationSerializer(complaint,many=True)
        return Response(serializer.data)
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myComplaints(request):
    if request.user.is_active:
        user = request.user
        try:
            people = People.objects.get(people = user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        complaint = ComplaintRegistration.objects.filter(people = people)
        serializer = ComplaintRegistrationSerializer(complaint,many=True)
        return Response(serializer.data)
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def singleComplaint(request,pk):
    if request.user.is_active:
        user = request.user
        try:
            people = People.objects.get(people = user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        complaint = ComplaintRegistration.objects.filter(id=pk)
        serializer = ComplaintRegistrationSerializer(complaint)
        return Response(serializer.data)
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def forwardToLawyer(request):
    if request.user.is_active:
        user = request.user
        try:
            people = People.objects.get(people = user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        serializer = AssignedComplaintsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(people = people)
            return Response(serializer.data)
        else:
            data = serializer.errors
            return Response(data)
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)       


@api_view(['GET'])
def getPoliceDistrict(request):
    police_dist = PoliceDistrict.objects.filter().order_by('police_district')
    serializer = PoliceDistrictSerializer(police_dist,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPoliceStation(request,pk):
    police_station = PoliceStation.objects.filter(police_district = pk).order_by('police_station')
    serializer = PoliceStationSerializer(police_station,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def otp_login_code(request) :
    number = '+91'+str(request.data['mobile_no'])
    account_sid = config('account_sid')
    auth_token = config('auth_token')
    client = Client(account_sid, auth_token)
    verification = client.verify \
                    .services(config('messaging_service_sid')) \
                    .verifications \
                    .create(to=number, channel='sms')

    print(verification.status)
    return Response(verification.status)

@api_view(['POST'])
def otp_verify_code(request):
    number = '+91'+str(request.data['mobile_no'])
    print(number)
    otp = request.data['otp']
    account_sid = config('account_sid')
    auth_token = config('auth_token')
    client = Client(account_sid, auth_token)
    verification_check = client.verify \
                        .services(config('messaging_service_sid')) \
                        .verification_checks \
                        .create(to= number, code= str(otp))

    return Response(verification_check.status)