from django.urls import path

from . import views

urlpatterns = [
    path('',views.getRouter),
    path('user-details/',views.getUsers),
    path('block-user/<str:pk>',views.blockUnblockUsers),
    path('lawyer-details/',views.getLawyers),
    path('hired-lawyers/',views.getHiredLawyers),
    path('lawyer-info/<str:pk>',views.viewLawyer),
    path('hire-lawyer/<str:pk>',views.hairLawyer),
    path('police-station/',views.getPoliceStation),
]