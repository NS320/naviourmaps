from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import MyUser 
from django.contrib.auth.hashers import make_password
from ..functions.util.decrypt import Crypt
from django.core.mail import send_mail
import random, string



def random_name(n):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=n))


class ForgetPassword(APIView):
    
    def post(self, request, format=None):
        
        try:
            encrypt_email = request.data["email"]#requestからemailの取り出し
            email = Crypt.decrypt(encrypt_email)#emailの複合化
            request_email = email
            myuser = MyUser.objects.get(email=request_email)#emailが一致するインスタンスの取り出し                      

            
            #パスワードの生成とハッシュ化
            raw_password = random_name(8)
            hash_password = make_password(raw_password)
            myuser.password = hash_password
            myuser.save()

            send_mail(
                '仮パスワードの発行',
                'Navihourの仮パスワードを発行します:'+ raw_password,
                'navihour@gmail.com',
                [request_email],
                fail_silently=False,
            )

            return Response({
                "result": "OK",
                "message": "Password is send to your email",
                },status=status.HTTP_201_CREATED)
        
        
        except MyUser.DoesNotExist:#見つからない場合
            return Response({"result": "NG", "message":"email is not found"},status=status.HTTP_400_BAD_REQUEST)            
        except Exception as e:
            print ('=== Error ===')
            print ('type:' + str(type(e)))
            print ('args:' + str(e.args))
            #print ('message:' + str(e.message))
            print ('e:' + str(e))
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)

    