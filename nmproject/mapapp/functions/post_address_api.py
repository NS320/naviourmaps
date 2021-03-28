from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser, Address
from django.contrib.auth.hashers import make_password


class RequestDataEmptyError(Exception):
    pass

def json_boolean_to_python(json_boolean):
    if json_boolean == "true":
        return True
    else:
        return False


class PostAddress(APIView):

    
    def post(self, request, format=None):
        
        
        try:
            request_user_id = request.data["user_id"]
            request_address = request.data["address"]
            request_address_name = request.data["address_name"]
            request_is_favorite = json_boolean_to_python(request.data["is_favorite"])
            request_is_private = json_boolean_to_python(request.data["is_private"])


            #いずれかのフィールドが空白の場合エラー
            if(not request_user_id)|(not request_address)|(not request_address_name):
                raise RequestDataEmptyError(Exception)
          

            new_address = Address.objects.create(
                user = MyUser.objects.get(user_id = request_user_id),
                address = request_address,
                address_name = request_address_name,
                is_favorite = request_is_favorite,
                is_private = request_is_private,
            )


            return Response({
                "result": "OK",
                "message": "Adding address is success",
            },status=status.HTTP_201_CREATED)


        except RequestDataEmptyError:
            return Response({"result": "NG", "message": "There is no requiredi tems"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)

