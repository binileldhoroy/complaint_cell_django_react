from datetime import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
import json
import razorpay


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from lawyer.serializer import GetPaymentDetailsSerializer, LawyerOfficeSerializer

from police.serializer import GetComplaints

from .models import *
from .serializers import *

from lawyer.models import Lawyer, LawyerPersonalInfo
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
            people = People.objects.get(people=user)
            userType = 'is_user'
        except:
            userType = None

        if userType == None:
            try:
                people = Lawyer.objects.get(lawyer=user)
                userType = 'is_lawyer'
            except:
                userType = None

        if userType == None:
            try:
                people = Police.objects.get(police=user)
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
            people = People.objects.get(people=user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        serializers = PersonalInfoSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save(people=people, pinfo_complete=True)
            People.objects.filter(people=user).update(complete_profile=True)
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
            people = People.objects.get(people=user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)

        # try:
        profile_complete = PersonalInfo.objects.filter(people=people)
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
                people = People.objects.get(people=user)
                pinfo = PersonalInfo.objects.get(people=people)
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
            people = People.objects.get(people=user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        name = UserInfo(user)
        profile_complete = PersonalInfo.objects.get(people=people)
        if profile_complete.pinfo_complete:
            serializers = RegistrationComplaintSerializer(data=request.data)
            if serializers.is_valid():
                serializers.save(people=people)
                return Response({'responce': serializers.data, 'profile': name.data})
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
            people = People.objects.get(people=user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        pinfo = PersonalInfo.objects.get(people=people)
        dist = pinfo.police_district
        lawyers = Lawyer.objects.filter(is_hire=True)
        dict_lawyers = lawyers.filter(
            officeaddress__office_city__contains=dist)
        non_dict_lawyers = lawyers.exclude(
            officeaddress__office_city__contains=dist).order_by('-id')
        # l = dict_lawyers + non_dict_lawyers
        lawyer_list1 = LawyerListSerializer(dict_lawyers, many=True)
        lawyer_list = LawyerListSerializer(non_dict_lawyers, many=True)
        return Response({"on_district": lawyer_list1.data, "non_district": lawyer_list.data})
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewLawyerDetails(request, pk):
    if request.user.is_active:
        user = User.objects.get(id=pk)
        lawyer = Lawyer.objects.get(lawyer=user)
        try:
            pinfo = LawyerPersonalInfo.objects.get(lawyer_id=lawyer)
        except:
            data = {'status': 'Lawyer didnt complete the profile'}
            return Response(data)
        serializers = GetLawyerProfileSerializer(pinfo)
        office = LawyerOfficeSerializer(lawyer.officeaddress)
        data = {'profile': serializers.data, 'office': office.data}
        return Response(data)
    else:
        data = {'status': 'You are not allowed here'}
        return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def acceptComplaintUser(request):
    if request.user.is_active:
        user = request.user
        try:
            people = People.objects.get(people=user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        complaint = ComplaintRegistration.objects.filter(
            people=people, case_status='FIR Registred')
        serializer = ComplaintRegistrationSerializer(complaint, many=True)
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
            people = People.objects.get(people=user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        complaint = ComplaintRegistration.objects.filter(people=people)
        serializer = ComplaintRegistrationSerializer(complaint, many=True)
        return Response(serializer.data)
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def singleComplaint(request, pk):
    if request.user.is_active:
        user = request.user
        try:
            people = People.objects.get(people=user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        complaint = ComplaintRegistration.objects.get(id=pk)
        print(people.id)
        pinfo = PersonalInfo.objects.get(people=people.id)
        personal_info = PersonalInfoSerializerGet(pinfo)
        serializer = GetComplaints(complaint)
        return Response({"complaint": serializer.data, "personalinfo": personal_info.data})
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def forwardToLawyer(request):
    if request.user.is_active:
        user = request.user
        try:
            people = People.objects.get(people=user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        serializer = AssignedComplaintsSerializer(data=request.data)
        complantId = request.data['complaint']
        if serializer.is_valid():
            serializer.save(people=people)
            ComplaintRegistration.objects.filter(
                id=complantId).update(forwarded=True)
            return Response({'data': serializer.data, 'status': 'Complaint Forwarded'})
        else:
            data = serializer.errors
            return Response(data)
    else:
        data = 'Your account is blocked by Admin '
        return Response(data)


@api_view(['GET'])
def getPoliceDistrict(request):
    police_dist = PoliceDistrict.objects.filter().order_by('police_district')
    serializer = PoliceDistrictSerializer(police_dist, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getPoliceStation(request, pk):
    police_station = PoliceStation.objects.filter(
        police_district=pk).order_by('police_station')
    serializer = PoliceStationSerializer(police_station, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def otp_login_code(request):
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
        .create(to=number, code=str(otp))

    return Response(verification_check.status)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyPayments(request):
    if request.user.is_active:
        user = request.user
        try:
            people = People.objects.get(people=user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        payments = PaymentRequest.objects.filter(people=people,payment_status='pending').order_by('date')
        for payment in payments:
            payment.lawyerinfo = Lawyer.objects.get(id = payment.lawyer_id.id)
            payment.getcomplaint = AssignedComplaints.objects.get(complaint = payment.complaint.id,is_accept = True)
            payment.save()
        serializer = GetPaymentDetailsUserSerializer(payments, many=True)
        return Response(serializer.data)
    else:
        data = {'status': 'You are not allowed here'}
        return Response(data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyCompletedPayments(request):
    if request.user.is_active:
        user = request.user
        try:
            people = People.objects.get(people=user)
        except:
            data = {'You are not allow here login as user'}
            return Response(data)
        payments = PaymentRequest.objects.filter(people=people,payment_status='completed',is_paid=True).order_by('date')
        for payment in payments:
            payment.lawyerinfo = Lawyer.objects.get(id = payment.lawyer_id.id)
            payment.getcomplaint = AssignedComplaints.objects.get(complaint = payment.complaint.id,is_accept = True)
            payment.save()
        serializer = GetPaymentDetailsUserSerializer(payments, many=True)
        return Response(serializer.data)
    else:
        data = {'status': 'You are not allowed here'}
        return Response(data)





@api_view(['POST'])
def startPayment(request):
    # request.data is coming from frontend
    amount = request.data['amount']
    name = request.data['name']
    complaint_id = request.data['complaint_id']

    # setup razorpay client this is the client to whome user is paying money that's you
    client = razorpay.Client(auth=(config('PUBLIC_KEY'), config('SECRET_KEY')))

    # create razorpay order
    # the amount will come in 'paise' that means if we pass 50 amount will become
    # 0.5 rupees that means 50 paise so we have to convert it in rupees. So, we will 
    # mumtiply it by 100 so it will be 50 rupees.
    payment = client.order.create({"amount": int(amount) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})

    # we are saving an order with isPaid=False because we've just initialized the order
    # we haven't received the money we will handle the payment succes in next 
    # function
    order = PaymentRequest.objects.filter(complaint=complaint_id)
    order.update(is_paid=False,payment_id=payment['id'])


    serializer = AssignedComplaintsSerializer(order)

    """order response will be 
    {'id': 17, 
    'order_date': '23 January 2021 03:28 PM', 
    'order_product': '**product name from frontend**', 
    'order_amount': '**product amount from frontend**', 
    'order_payment_id': 'order_G3NhfSWWh5UfjQ', # it will be unique everytime
    'isPaid': False}"""

    data = {
        "payment": payment,
        "order": serializer.data
    }
    return Response(data)




@api_view(['POST'])
def handlePaymentSuccess(request):
    # request.data is coming from frontend
    res = json.loads(request.data["response"])

    """res will be:
    {'razorpay_payment_id': 'pay_G3NivgSZLx7I9e', 
    'razorpay_order_id': 'order_G3NhfSWWh5UfjQ', 
    'razorpay_signature': '76b2accbefde6cd2392b5fbf098ebcbd4cb4ef8b78d62aa5cce553b2014993c0'}
    this will come from frontend which we will use to validate and confirm the payment
    """

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    # res.keys() will give us list of keys in res
    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]

    # get order by payment_id which we've created earlier with isPaid=False
    order = PaymentRequest.objects.filter(payment_id=ord_id)
    
    # we will pass this whole data in razorpay client to verify the payment
    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }

    client = razorpay.Client(auth=(config('PUBLIC_KEY'), config('SECRET_KEY')))

    # checking if the transaction is valid or not by passing above data dictionary in 
    # razorpay client if it is "valid" then check will return None
    check = client.utility.verify_payment_signature(data)
    if check == None or check == "":
        return Response({'error': 'Something went wrong','status': 'false'})

    # if payment is successful that means check is None then we will turn isPaid=True
    order.update(is_paid = True,payment_status='completed',payment_date=datetime.now())

    res_data = {
        'message': 'payment successfully received!',
        'status':'true'
    }

    return Response(res_data)


@api_view(['GET'])
def startChat(request):
    pass


@api_view(['GET'])
def room(request,room_name):
    pass