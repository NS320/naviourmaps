from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser, Address


def json_boolean_to_python(json_boolean):
    if json_boolean == "true":
        return True
    else:
        return False


class PutAddress(APIView):


    def post(self, request, format=None):

        try:
            request_address_id = request.data["address_id"]
            request_address = request.data["address"]
            request_address_name = request.data["address_name"]
            request_is_favorite = request.data["is_favorite"]
            request_is_private = request.data["is_private"]
            my_address = Address.objects.get(address_id=request_address_id)

            
            my_address.address = request_address
            my_address.address_name = request_address_name
            my_address.is_favorite  = request_is_favorite
            my_address.is_private = request_is_private
            my_address.save()


            return Response({
                "result":"OK",
                "message":"Request Success",        
            }, status=status.HTTP_200_OK)


        except Address.DoesNotExist:
            return Response({"result": "NG", "message": "address_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"result": "NG", "message": "Bad request"},status=status.HTTP_400_BAD_REQUEST)