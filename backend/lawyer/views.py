from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import generics

from .models import *
from .serializer import *

@api_view(['GET'])
def getRouter(request):
    routes = [
        'api/lawyer',
        'api/lawyer/lawyer-signup/',
        'api/lawyer/lawyer-personalinfo/',
        'api/lawyer/Add-office/',
        'api/lawyer/lawyer-profile/'
    ]
    return Response(routes)



class LawyerRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = LawyerRegisterSerializer


@api_view(['POST'])
def lawyerPersonalView(request):
    serializers = LawyerPersonalInfoSerializer(data=request.data)
    user = User.objects.get(username = 'adrash')
    lawyer = Lawyer.objects.get(lawyer_id = user)
    print(lawyer)
    if serializers.is_valid():
        print('success')
        serializers.save(lawyer_id = lawyer)
        return Response(serializers.data)
    else:
        data = serializers.errors
        return Response(data)


@api_view(['POST'])
def lawyerOfficeView(request):
    serializers = LawyerOfficeSerializer(data=request.data)
    user = User.objects.get(username = 'adrash')
    lawyer = Lawyer.objects.get(lawyer_id = user)
    if serializers.is_valid():
        serializers.save(lawyer_id = lawyer)
        return Response(serializers.data)
    else:
        data = serializers.errors
        return Response(data)


@api_view(['GET'])
def lawyerProfile(request):
    # if request.user.is_people:
    user = User.objects.get(username = 'adrash')
    lawyer = Lawyer.objects.get(lawyer = user)
    pinfo = LawyerPersonalInfo.objects.get(lawyer_id = lawyer)
    serializers = LawyerProfileGetSerializer(pinfo)
    return Response(serializers.data)
    # else:
    #     data = {'error'}
    #     return Response(data)