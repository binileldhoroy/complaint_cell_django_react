from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes,name='routes'),
    path('police-signup/',views.RegisterView.as_view()),
]