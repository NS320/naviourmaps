from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser, Address



class PrivateAddress(APIView):


    def post(self, request, format=None):


        try:
            request_address_id = request.data["address_id"]
            request_is_private = request.data["is_private"]


            is_private_confirm = Address.objects.get(address_id=request_address_id)
            is_private_confirm.is_private = request_is_private
            is_private_confirm.save()

            return Response({
                "result":"OK",
                "message":"Request Success",        
            }, status=status.HTTP_200_OK)


        except Address.DoesNotExist:#address_idが見つからない場合
            return Response({"result": "NG", "message":"address_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)