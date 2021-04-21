from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ...models import MyUser, Navigations
from .serializers.get_others_navigations_serializer import GetOthersNavigationsSerializer



class GetOthersNavigations(APIView):


    def post(self, request, format=None):
        
        
        try:
            request_user_id = request.data["user_id"]
            myuser_int_id = MyUser.objects.get(user_id=request_user_id).id
            others_navigations_list = Navigations.objects.filter(is_private=False).exclude(myuser_foreign=myuser_int_id)#filterで条件合致するレコードを取得し、excludeで条件合致するレコードを除外
            serializer = GetOthersNavigationsSerializer(others_navigations_list, many=True)



            return Response({
                "result":"OK",
                "message":"Getting others navigations is success",
                "others_navigations_list": serializer.data
            }, status=status.HTTP_200_OK)

        
        except MyUser.DoesNotExist:#user_idが無い場合
            return Response({"result": "NG", "message": "user_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print ('=== Error ===')
            print ('type:' + str(type(e)))
            print ('args:' + str(e.args))
            #print ('message:' + str(e.message))
            print ('e:' + str(e))
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)
