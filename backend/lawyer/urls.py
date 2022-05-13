from django.urls import path

from . import views

urlpatterns = [
    path('',views.getRouter),
    path('lawyer-signup/',views.LawyerRegisterView.as_view()),
      path('lawyer-personalinfo/',views.lawyerPersonalView),
      path('Add-office/',views.lawyerOfficeView),
      path('lawyer-profile/',views.lawyerProfile),


]