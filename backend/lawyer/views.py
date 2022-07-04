from typing import List
from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from police.models import AddNote
from police.serializer import NoteSerializer
from people.models import PersonalInfo
from people.serializers import PersonalInfoSerializer
from datetime import date

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
    parser_classes = (MultiPartParser, FormParser)
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
    complaints = AssignedComplaints.objects.filter(lawyer = lawyer,is_accept=False)
    accept_count = AssignedComplaints.objects.filter(lawyer = lawyer,is_accept=True).count()
    print(accept_count)
    serializer = LawyerAssignedComplaints(complaints,many=True)
    return Response({'data':serializer.data,'accept_count':accept_count})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewAssignedComplaints(request,pk):
    user = request.user
    try:
        lawyer = Lawyer.objects.get(lawyer = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    complaint = AssignedComplaints.objects.get(id = pk)
    print(complaint.people)
    serializer = LawyerAssignedComplaints(complaint)
    userInfo = PersonalInfoSerializer(PersonalInfo.objects.get(people = complaint.people))
    ofiice = OfficeAddress.objects.get(office = lawyer)
    office_info = LawyerOfficeSerializer(ofiice)
    consulten_fee = office_info.data['consulten_fee']
    return Response({'complaint':serializer.data,'userinfo':userInfo.data,'consulten_fee':consulten_fee})
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNote(request,pk):
    user = request.user
    try:
        lawyer = Lawyer.objects.get(lawyer = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)

    notes = AddNote.objects.filter(complaint = pk)
    serializer = NoteSerializer(notes,many = True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def lawyerCaseAccept(request):
    user = request.user
    try:
        lawyer = Lawyer.objects.get(lawyer = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    serializer = LawyerCasseAcceptSerializer(data=request.data)
    cur_date = date.today()
    complaint = request.data['complaint']
    if serializer.is_valid():
        serializer.save(lawyer_id = lawyer,date=cur_date,payment_status='pending')
        text = AssignedComplaints.objects.filter(complaint = complaint).update(is_accept=True)
        return Response(serializer.data)
    else:
        data = [serializer.errors]
        return Response(data)
