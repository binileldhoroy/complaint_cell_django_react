from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('',views.getRoutes,name='routes'),
    path('signup/',views.RegisterView.as_view()),
    path('personalinfo/',views.personalView),
    path('profile/',views.userProfile),
    path('newcomplaint/',views.complaintRegistration),
    path('view-lawyers/',views.viewLawyers),
    path('lawyers-details/<str:pk>',views.viewLawyerDetails),
    path('accepted-complaints/',views.acceptComplaintUser),
    path('my-complaints/',views.myComplaints),
    path('single-complaints/<str:pk>',views.singleComplaint),
    path('forwardto-lawyer/',views.forwardToLawyer),
    path('police-district/',views.getPoliceDistrict),
    path('police-station/<str:pk>',views.getPoliceStation),
    path('send-otp/',views.otp_login_code),
    path('otp-verify/',views.otp_verify_code),
    path('my-payments/',views.getMyPayments),
    path('payment-completed/',views.getMyCompletedPayments),
    path('pay/', views.startPayment, name="payment"),
    path('payment/success/', views.handlePaymentSuccess, name="payment_success"),
    path('chat/',views.startChat,name='chat'),
    path('<str:room_name>/',views.room)
]