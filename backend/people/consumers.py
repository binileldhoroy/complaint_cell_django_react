from channels.consumer import AsyncConsumer
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
    pass

# class NotificatonConsumer(AsyncConsumer):
#     async def websocket_connect(self, event):
#         room_name = self.scope['url_route']['kwargs']['room_name']
#         print(room_name)
#         board_room = 'boardroom'
#         self.board_room = room_name
#         await self.channel_layer.group_add(
#             board_room,self.channel_name
#         )
#         await self.send({
#             "type": "websocket.accept"
#         })

#     async def websocket_receive(self, event):
#         initital_data = event.get('text',None)

#         await self.channel_layer.group_send(
#             self.board_room,{
#                 "type":"board_message",
#                 "text":initital_data
#             }
#         )
    
#     async def board_message(self,event):
#         await self.send({
#             "type":"websocket.send",
#             "text":event['text']
#         })

#     async def websocket_disconnect(self, event):
#         print("disconnect",event)