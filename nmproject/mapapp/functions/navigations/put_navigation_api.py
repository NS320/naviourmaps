from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ...models import MyUser, Navigations



class PutNavigation(APIView):


    def post(self, request, format=None):


        try:
            request_navigation_id = request.data["navigation_id"]
            request_navigation_name = request.data["navigation_name"]
            request_is_favorite = request.data["is_favorite"]
            request_is_private = request.data["is_private"]


            edit_navigation_confirm = Navigations.objects.get(navigation_id=request_navigation_id)
            edit_navigation_confirm.navigation_name = request_navigation_name
            edit_navigation_confirm.is_favorite = request_is_favorite
            edit_navigation_confirm.is_private = request_is_private
            edit_navigation_confirm.save()

            return Response({
                "result":"OK",
                "message":"Request Success",        
            }, status=status.HTTP_200_OK)


        except Navigations.DoesNotExist:#navigation_idが見つからない場合
            return Response({"result": "NG", "message":"navigation_id is not found"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print ('=== Error ===')
            print ('type:' + str(type(e)))
            print ('args:' + str(e.args))
            #print ('message:' + str(e.message))
            print ('e:' + str(e))
            return Response({"result":"NG", "message":"Bad request"},status=status.HTTP_400_BAD_REQUEST)