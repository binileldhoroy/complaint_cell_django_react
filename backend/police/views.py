from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics



from .models import *
from .serializer import PoliceRegisterSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/police/',
        'api/police/police-signup/',
    ]
    return Response(routes)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = PoliceRegisterSerializer