from django.urls import path

from . import views

urlpatterns = [
    path('',views.getRouter),
    path('lawyer-signup/',views.LawyerRegisterView.as_view()),
    path('lawyer-personalinfo/',views.lawyerPersonalView),
    path('add-office/',views.lawyerOfficeView),
    path('lawyer-profile/',views.lawyerProfile),
    path('requested-complaints/',views.assignedComplaints),
]