from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import generics

from .models import *
from .serializers import *

from people.models import People, User
from lawyer.models import Lawyer,LawyerPersonalInfo

@api_view(['GET'])
def getRouter(request):
    routes = [
        'api/dashboard',
        'api/dashboard/block-user/<str:pk>',
        'api/dashboard/block-user/<str:pk>',
        'api/dashboard/lawyer-details/',
        'api/dashboard/lawyer-info/<str:pk>',
    ]
    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    if request.user.is_superuser:
        people = People.objects.all()
        serializer = GetUserSerializer(people,many=True)
        return Response(serializer.data)
    else:
        data = {'status':'You are not allowed here'}
        return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def blockUnblockUsers(request,pk):
    if request.user.is_superuser:
        user = User.objects.filter(id = pk)
        action = request.data['action']
        if action == 'block':
            user.update(is_active = False)
            data = 'User Blocked'
            return Response(data)
        elif action == 'unblock':
            user.update(is_active = True)
            data = 'User Unblocked'
            return Response(data)
    else:
        data = {'status':'You are not allowed here'}
        return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getLawyers(request):
    if request.user.is_superuser:
        lawyer = Lawyer.objects.filter(is_hire=False)
        serializer = GetLawyerSerializer(lawyer,many=True)
        return Response(serializer.data)
    else:
        data = {'status':'You are not allowed here'}
        return Response(data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewLawyer(request,pk):
    if request.user.is_superuser:
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
def hairLawyer(request,pk):
    if request.user.is_superuser:
        user = User.objects.filter(id = pk)
        lawyer = Lawyer.objects.filter(lawyer = user).update(is_hire = True)
        data = {'status':'Lawyer is hired'}
        return Response(data)
    else:
        data = {'status':'You are not allowed here'}
        return Response(data)