from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

from people.models import People,ComplaintRegistration, PersonalInfo
from people.serializers import PersonalInfoSerializerGet


from .models import *
from .serializer import *

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/police/',
        'api/police/police-signup/',
        'api/police/complaints/',
        'api/police/accept-complaint/<str:pk>',
        'api/police/accepted-complaints/',
        'api/police/completed-complaints/',
        'api/police/refuse-complaint/<str:pk>',
        'api/police/file-fir/<str:pk>',
        'api/police/add-note/<str:pk>',
        'api/police/notes/<str:pk>'

    ]
    return Response(routes)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = PoliceRegisterSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getComplaint(request):
    user = request.user
    try:
        police = Police.objects.get(police = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    station = police.ps_place
    complaints = ComplaintRegistration.objects.filter(police_place = station,complaint_status='Registred')
    serializer = GetComplaints(complaints,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewComplaint(request,pk):
    user = request.user
    try:
        police = Police.objects.get(police = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    complaints = ComplaintRegistration.objects.get(id = pk)
    pinfo = PersonalInfo.objects.get(id = complaints.people.id)
    personal_info = PersonalInfoSerializerGet(pinfo)
    serializer = GetComplaints(complaints)
    return Response({"complaint":serializer.data,"personalinfo":personal_info.data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def acceptComplaint(request,pk):
    user = request.user
    try:
        police = Police.objects.get(police = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    complaints = ComplaintRegistration.objects.filter(id = pk)
    complaints.update(complaint_status='Opened',case_status = 'Opened')
    serializer = GetComplaints(complaints)
    data = 'Complaint Accepted'
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def acceptedComplaint(request):
    user = request.user
    try:
        police = Police.objects.get(police = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    station = police.ps_place
    complaints = ComplaintRegistration.objects.filter(police_place = station).filter(complaint_status='Opened')
    serializer = GetComplaints(complaints,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def refuseComplaint(request,pk):
    user = request.user
    try:
        police = Police.objects.get(police = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    complaints = ComplaintRegistration.objects.filter(id = pk)
    complaints.update(complaint_status='Closed',case_status = 'Disposed')
    serializer = GetComplaints(complaints)
    data = 'Complaint Disposed'
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fileFIRComplaint(request,pk):
    user = request.user
    try:
        police = Police.objects.get(police = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    complaints = ComplaintRegistration.objects.filter(id = pk)
    complaints.update(complaint_status='Closed',case_status = 'FIR Registred')
    serializer = GetComplaints(complaints)
    data = {'Complaint Disposed'}
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def completedCase(request):
    user = request.user
    try:
        police = Police.objects.get(police = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    station = police.ps_place
    complaints = ComplaintRegistration.objects.filter(police_place = station).filter(case_status='FIR Registred')
    serializer = GetComplaints(complaints,many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addNotes(request, pk):
    user = request.user
    try:
        police = Police.objects.get(police = user)
        complaint = ComplaintRegistration.objects.get(id = pk)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        AddNote.objects.create(
            police = police,
            complaint = complaint,
            note = request.data['note']
        )
        data = 'Note Added'
        return Response(data)
    else:
        data = serializer.errors
        return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNote(request,pk):
    user = request.user
    try:
        police = Police.objects.get(police = user)
    except:
        data = {'You are not allow here login as user'}
        return Response(data)

    notes = AddNote.objects.filter(complaint = pk)
    serializer = NoteSerializer(notes,many = True)
    return Response(serializer.data)
