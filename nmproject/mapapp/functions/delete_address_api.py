from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser, Address



class DeleteAddress(APIView):


    def post(self, request, format=None):

        try:
            request_address_id = request.data["address_id"]
            my_address = Address.objects.get(address_id=request_address_id)#address_idが無い場合exceptのAddress.DoesNotExist
            my_address.delete()


            return Response({
                "result":"OK",
                "message":"Request Success",        
            }, status=status.HTTP_200_OK)


        except Address.DoesNotExist:#address_idが無い場合
            return Response({"result": "NG", "message": "address_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"result": "NG", "message": "Bad request"},status=status.HTTP_400_BAD_REQUEST)