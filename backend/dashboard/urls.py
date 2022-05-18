from django.urls import path

from . import views

urlpatterns = [
    path('',views.getRouter),
    path('user-details/',views.getUsers),
    path('block-user/<str:pk>',views.blockUnblockUsers),
    path('lawyer-details/',views.getLawyers),
    path('lawyer-info/<str:pk>',views.viewLawyer),
]