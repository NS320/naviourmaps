from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser, Address

class RequestDataEmptyError(Exception):
    pass


class PostAddress(APIView):

    
    def post(self, request, format=None):
        
        
        try:
            request_user_id = request.data["user_id"]
            request_address = request.data["address"]
            request_address_name = request.data["address_name"]
            request_is_favorite = request.data["is_favorite"]
            request_is_private = request.data["is_private"]

            
            #addressかaddress_nameが空白の場合エラー
            if(not request_address)|(not request_address_name):
                raise RequestDataEmptyError(Exception)
          

            new_address = Address.objects.create(
                myuser_foreign = MyUser.objects.get(user_id = request_user_id),#外部キーを使った参照
                address = request_address,
                address_name = request_address_name,
                is_favorite = request_is_favorite,
                is_private = request_is_private,
            )


            return Response({
                "result": "OK",
                "message": "Adding address is success",
            },status=status.HTTP_201_CREATED)

        except MyUser.DoesNotExist:#user_idが無い場合
            return Response({"result": "NG", "message": "user_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except RequestDataEmptyError:
            return Response({"result": "NG", "message": "There is no requiredi items"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)

