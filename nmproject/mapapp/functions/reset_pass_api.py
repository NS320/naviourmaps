from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser
from django.contrib.auth.hashers import make_password, check_password
from ..functions.util.decrypt import Crypt


class RequestNewPasswordDifferentError(Exception):
    pass
class RequestNewPasswordShortError(Exception):
    pass
class RequestPasswordDifferentError(Exception):
    pass
class ThisIsGuestAccount(Exception):
    pass

class ResetPass(APIView):


    def post(self, request, format=None):


        try:
            request_user_id = request.data["user_id"]
            if (request_user_id == "guest"):
                raise ThisIsGuestAccount(Exception)
            encrypt_password = request.data["password"]
            request_password = Crypt.decrypt(encrypt_password)#passwordの復号化
            encrypt_new_password1 = request.data["new_password1"]
            request_new_password1 = Crypt.decrypt(encrypt_new_password1)
            encrypt_new_password2 = request.data["new_password2"]
            request_new_password2 = Crypt.decrypt(encrypt_new_password2)

            if request_new_password1 != request_new_password2:#新しいパスワード2つが一致しない
                raise RequestNewPasswordDifferentError()
            if len(request_new_password1) < 8:#新しいパスワードが8文字より少ない場合
                raise RequestNewPasswordShortError
            
            myuser = MyUser.objects.get(user_id=request_user_id)
            if not check_password(request_password, myuser.password):
                raise RequestPasswordDifferentError()


            #パスワードのハッシュ化と登録
            hash_password = make_password(request_new_password1)
            myuser.password = hash_password
            myuser.save()

            return Response({
                "result": "OK",
                "message": "Register success!"
                },status=status.HTTP_201_CREATED)  


        except MyUser.DoesNotExist:#user_idが無い場合
            return Response({"result": "NG", "message": "user_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except ThisIsGuestAccount:
            return Response({"result": "NG", "message": "Guest account cannot change"},status=status.HTTP_400_BAD_REQUEST)
        except RequestNewPasswordDifferentError:
            return Response({"result":"NG", "message":"new_password1 and new_password2 are not match"})
        except RequestNewPasswordShortError:
            return Response({"result":"NG", "message":"New password needs at least 8 characters"})
        except RequestPasswordDifferentError:
            return Response({"result":"NG", "message":"password is different"})
        except:
            return Response({"result": "NG", "message": "Bad request"},status=status.HTTP_400_BAD_REQUEST)
      
