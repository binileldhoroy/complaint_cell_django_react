from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from people.models import People

from .serializers import PeopleSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from people.api import serializers


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
    ]
    return Response(routes)

@api_view(['POST'])
def signupView(request):
    serializers = PeopleSerializer(data=request.data)
    f_name = request.data['first_name']
    l_name = request.data['last_name']
    username = request.data['username']
    phone = request.data['phone']
    email = request.data['email']
    password = request.data['password']
    data = {}
    if serializers.is_valid():
        People.objects.create_user(
            first_name = f_name,
            last_name = l_name,
            username = username,
            phone = phone,
            email = email,
            password = password
        )
        data['status'] = 'success'
        print(data)
    else:
        data = serializers.errors
        print(data)
    return Response(data)