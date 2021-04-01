from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser



class GetUser(APIView):


    def post(self, request, format=None):
        
        
        try:
            request_user_id = request.data["user_id"]
            myuser = MyUser.objects.get(user_id = request_user_id)#user_idが一致するインスタンス
            

            return Response({
                "result":"OK",
                "message":"Getting user is success",
                "name":myuser.name,
                "email":myuser.email,
                "biography":myuser.biography
            }, status=status.HTTP_200_OK)


        except MyUser.DoesNotExist:#user_idが無い場合
            return Response({"result": "NG", "message": "user_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)