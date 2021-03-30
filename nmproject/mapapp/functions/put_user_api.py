from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser, Address



class PutUser(APIView):


    def post(self, request, format=None):

        try:
            request_user_id = request.data["user_id"]
            request_new_user_id = request.data["new_user_id"]
            request_new_name = request.data["new_name"]
            request_new_email = request.data["new_email"]
            request_new_biography = request.data["new_biography"]
            my_user = MyUser.objects.get(user_id=request_user_id)#user_idが無い場合exceptのAddress.DoesNotExist

            
            my_user.user_id = request_new_user_id
            my_user.name = request_new_name
            my_user.email = request_new_email
            my_user.biography  = request_new_biography
            my_user.save()


            return Response({
                "result":"OK",
                "message":"Request Success",        
            }, status=status.HTTP_200_OK)


        except Address.DoesNotExist:#user_idが無い場合
            return Response({"result": "NG", "message": "user_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"result": "NG", "message": "Bad request"},status=status.HTTP_400_BAD_REQUEST)