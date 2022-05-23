from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import generics

import lawyer

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
    user = request.user
    try:
        user = User.objects.get(username = user)
        lawyer = Lawyer.objects.get(lawyer = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    serializers = LawyerPersonalInfoSerializer(data=request.data)
    if serializers.is_valid():
        print('success')
        serializers.save(lawyer_id = lawyer)
        return Response(serializers.data)
    else:
        data = serializers.errors
        return Response(data)


@api_view(['POST'])
def lawyerOfficeView(request):
    user = request.user
    try:
        lawyer = Lawyer.objects.get(lawyer = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    serializers = LawyerOfficeSerializer(data=request.data)
    print(serializers)
    if serializers.is_valid():
        serializers.save(office = lawyer)
        return Response(serializers.data)
    else:
        data = serializers.errors
        return Response(data)

@api_view(['GET'])
def lawyerProfile(request):
    user = request.user
    try:
        lawyer = Lawyer.objects.get(lawyer = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    if lawyer.is_hire:
        pinfo = LawyerPersonalInfo.objects.get(lawyer_id = lawyer)
        serializers = LawyerProfileGetSerializer(pinfo)
        return Response(serializers.data)
    else:
        data = {'Your request is pending at admin'}
        return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def assignedComplaints(request):
    user = request.user
    try:
        lawyer = Lawyer.objects.get(lawyer = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    complaints = AssignedComplaints.objects.filter(lawyer = lawyer)
    serializer = LawyerAssignedComplaints(complaints,many=True)
    return Response(serializer.data)