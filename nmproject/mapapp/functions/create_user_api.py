from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser
from django.contrib.auth.hashers import make_password
from ..functions.util.decrypt import Crypt


class RequestDataEmptyError(Exception):
    pass
class ExistMailError(Exception):
    pass
class ExistUserIdError(Exception):
    pass

class CreateUser(APIView):


    def post(self, request, format=None):


        try:
            request_user_id = request.data["user_id"]
            request_name = request.data["name"]

            encrypt_password = request.data["password"]#requestからpasswordの取り出し
            password = Crypt.decrypt(encrypt_password)#passwordの複合化
            request_raw_password = password

            encrypt_email = request.data["email"]#requestからemailの取り出し
            email = Crypt.decrypt(encrypt_email)#emailの複合化
            request_email = email

            request_biography = request.data["biography"]


            #いずれかのフィールドが空白の場合エラー
            if (not request_user_id)|(not request_name)|(not request_raw_password)|(not request_email):
                raise RequestDataEmptyError()

            
            #データベースに同じuser_idまたはemailがある場合エラー
            if MyUser.objects.filter(user_id=request_user_id).exists():
                raise ExistUserIdError()
            if MyUser.objects.filter(email=request_email).exists():
                raise ExistMailError()
            #パスワードのハッシュ化
            hash_password = make_password(request_raw_password)


            new_user = MyUser.objects.create(
                user_id = request_user_id,
                name = request_name,
                password = hash_password,
                email = request_email,
                biography = request_biography
            )


            new_user.is_logon = True
            new_user.save()
            return Response({
                "result": "OK",
                "message": "Register success!"
                },status=status.HTTP_201_CREATED)  


        except RequestDataEmptyError:
            return Response({"result":"NG", "message":"There is no required items"},status=status.HTTP_400_BAD_REQUEST)
        except ExistMailError:
            return Response({"result":"NG", "message":"Already used mail"},status=status.HTTP_400_BAD_REQUEST)
        except ExistUserIdError:
            return Response({"result":"NG", "message":"Already used USER ID"},status=status.HTTP_400_BAD_REQUEST)        
