from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser, Address


class NoDataError(Exception):
    pass


def json_boolean_to_python(json_boolean):
    if json_boolean == "true":
        return True
    else:
        return False


class FavoriteAddress(APIView):


    def post(self, request, format=None):
        try:
            request_address_id = request.data["address_id"]
            request_is_favorite = json_boolean_to_python(request.data["is_favorite"])
            my_address = Address.objects.filter(address_id=request_address_id)
           
            if not my_address.exists():
                raise NoDataError(Exception)

            is_favorite_confirm = Address.objects.get(address_id=request_address_id)
            is_favorite_confirm.is_favorite = request_is_favorite
            is_favorite_confirm.save()

            return Response({
                "result":"OK",
                "message":"Request Success",        
            }, status=status.HTTP_200_OK)


        except NoDataError:
            return Response({"result": "NG","message":"Address_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)