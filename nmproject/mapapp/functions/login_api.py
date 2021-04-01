from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser 
from django.contrib.auth.hashers import check_password
from ..functions.util.decrypt import Crypt

# Create your views here.
class PasswordIncorrectError(Exception):
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
            login = MyUser.objects.get(email=request_email)#emailが一致するインスタンスの取り出し                      
            if not check_password(request_raw_password, login.password):#パスワードの確認
                raise PasswordIncorrectError()
            

            login.is_logon = True
            login.save()

            return Response({
                "result": "OK",
                "message": "Login success!",
                "name": login.name,
                "user_id": login.user_id,
                "biography": login.biography,
                },status=status.HTTP_201_CREATED)
        
        
        except MyUser.DoesNotExist:#見つからない場合
            return Response({"result": "NG", "message": "user_id is not found"},status=status.HTTP_400_BAD_REQUEST)            
        except NoDataError:
            return Response({"result": "NG","message":" Email or password is not found"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print ('=== Error ===')
            print ('type:' + str(type(e)))
            print ('args:' + str(e.args))
            #print ('message:' + str(e.message))
            print ('e:' + str(e))
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)

    