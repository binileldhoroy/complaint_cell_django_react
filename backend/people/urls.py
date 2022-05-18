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
]