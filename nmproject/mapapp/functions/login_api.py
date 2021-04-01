from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser 
from django.contrib.auth.hashers import check_password
from ..functions.util.decrypt import Crypt

# Create your views here.
class NoDataError(Exception):
    pass

class Login(APIView):
    
    def post(self, request, format=None):
        
        try:
            encrypt_email = request.data["email"]#requestからemailの取り出し
            email = Crypt.decrypt(encrypt_email)#emailの複合化
            request_email = email 

            encrypt_password = request.data["password"]#requestからpasswordの取り出し
            password = Crypt.decrypt(encrypt_password)#passwordの複合化
            request_raw_password = password
            
            login = MyUser.objects.filter(email=request_email)#request_emailを含むレコードをMyUserデータベースから取り出し取り出し&
                        
            if not login.filter(email=request_email).exists():#メールの確認
                raise NoDataError()
            if not check_password(request_raw_password, login.values_list('password', flat=True).first()):#パスワードの確認,flat=Trueで平文にする
                raise NoDataError()
            
            login_confirm = MyUser.objects.get(email=request_email)

            login_confirm.is_logon = True
            login_confirm.save()

            return Response({
                "result": "OK",
                "message": "Login success!",
                "name": login.values_list('name', flat=True).first(),
                "user_id": login.values_list('user_id', flat=True).first(),
                "biography": login.values_list('biography', flat=True).first(),
                },status=status.HTTP_201_CREATED)            
        except NoDataError:
            return Response({"result": "NG","message":" Email or password is not found"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print ('=== Error ===')
            print ('type:' + str(type(e)))
            print ('args:' + str(e.args))
            #print ('message:' + str(e.message))
            print ('e:' + str(e))
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)

    