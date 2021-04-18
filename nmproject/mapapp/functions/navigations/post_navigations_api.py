from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ...models import MyUser, Navigations



class PostNavigations(APIView):

    
    def post(self, request, format=None):
        
        
        try:
            request_user_id = request.data["user_id"]
            request_navigation_name = request.data["navigation_name"]
            request_start_address = request.data["start_address"]
            request_start_lat = request.data["start_lat"]
            request_start_lng = request.data["start_lng"]
            request_goal_address = request.data["goal_address"]
            request_goal_lat = request.data["goal_lat"]
            request_goal_lng = request.data["goal_lng"]
            

            new_navigation = Navigations.objects.create(
                myuser_foreign = MyUser.objects.get(user_id = request_user_id),#外部キーを使った参照
                navigation_name = request_navigation_name,
                start_address = request_start_address,
                start_lat = request_start_lat,
                start_lng = request_start_lng,
                goal_address = request_goal_address,
                goal_lat = request_goal_lat,
                goal_lng = request_goal_lng,
            )


            return Response({
                "result": "OK",
                "message": "Adding navigation is success",
            },status=status.HTTP_201_CREATED)

        except MyUser.DoesNotExist:#user_idが無い場合
            return Response({"result": "NG", "message": "user_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print ('=== Error ===')
            print ('type:' + str(type(e)))
            print ('args:' + str(e.args))
            #print ('message:' + str(e.message))
            print ('e:' + str(e))
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)