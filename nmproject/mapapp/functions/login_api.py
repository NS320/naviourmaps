from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from ..models import MyUser
from .serializers import LoginSerializer
from django.contrib.auth.hashers import check_password

# Create your views here.
class NoDataError(Exception):
    pass

class Login(APIView):
    
    def get(self, request, format=None):
        myuser = MyUser.objects.all()
        serializer = LoginSerializer(myuser, many=True)
        print (serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        
        try:
            request_email = request.data["email"]#requestからemailの取り出し
            request_raw_password = request.data["password"]#requestからpasswordの取り出し
            
            login = MyUser.objects.filter(email=request_email)#request_emailを含むレコードをMyUserデータベースから取り出し取り出し&
            serializer = LoginSerializer(login, many=True)#loginのクエリセットを辞書型に変換
                        
            if not login.filter(email=request_email).exists():#メールの確認
                raise NoDataError()
            if not check_password(request_raw_password, login.values_list('password', flat=True).first()):#パスワードの確認,flat=Trueで平文にする
                raise NoDataError()

            return Response({
                "result": "OK",
                "user_id": login.values_list('user_id', flat=True).first(),
                "biography": login.values_list('biography', flat=True).first(),
                },status=status.HTTP_201_CREATED)            
        except NoDataError:
            return Response({"result": "NG","message":" Email or password is not found"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)
        
#class CreateUser(APIView):



        
        '''   
        myuser = MyUser.objects.all()
        request_email = request.data["email"]
        request_raw_password = request.data["password"]
        login_test = MyUser.objects.filter(email=request_email)
        login = MyUser.objects.get(email=request_email)
        serializer = LoginSerializer(login_test, many=True)
        print(login_test.values_list('password',flat=True).first())
        print(login)
        #if not login.filter(email=request_email).exists():
        #    return Response({"message":"ダメです"})    
        return Response(serializer.data)
        '''