from django.urls import re_path

from .consumers import NotificatonConsumer

websocket_urlpatterns = [
    re_path(r'(?P<room_name>\w+)/$', NotificatonConsumer.as_asgi()),
]