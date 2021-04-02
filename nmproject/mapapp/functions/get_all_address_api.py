from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser, Address
from .serializers import GetAllAddressSerializer



class GetAllAddress(APIView):


    def post(self, request, format=None):
        
        
        try:
            request_user_id = request.data["user_id"]
            myuser_int_id = MyUser.objects.get(user_id=request_user_id).id
            all_address_list = Address.objects.filter(myuser_foreign = myuser_int_id)#user_idが一致するレコードをすべて取得
            serializer = GetAllAddressSerializer(all_address_list, many=True)



            return Response({
                "result":"OK",
                "message":"Getting all address is success",
                "all_address_list": serializer.data
            }, status=status.HTTP_200_OK)

        
        except MyUser.DoesNotExist:#user_idが無い場合
            return Response({"result": "NG", "message": "user_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)