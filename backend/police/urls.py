from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes,name='routes'),
    path('police-signup/',views.RegisterView.as_view()),
    path('complaints/',views.getComplaint),
    path('complaint/<str:pk>',views.viewComplaint),
    path('accepted-complaints/',views.acceptedComplaint),
    path('completed-complaints/',views.completedCase),
    path('accept-complaint/<str:pk>',views.acceptComplaint),
    path('refuse-complaint/<str:pk>',views.refuseComplaint),
    path('file-fir/<str:pk>',views.fileFIRComplaint),
    path('add-note/<str:pk>',views.addNotes),
    path('notes/<str:pk>',views.getNote),
]