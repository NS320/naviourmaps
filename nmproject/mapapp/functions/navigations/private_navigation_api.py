from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ...models import MyUser, Navigations



class PrivateNavigation(APIView):


    def post(self, request, format=None):


        try:
            request_navigation_id = request.data["navigation_id"]
            request_is_private = request.data["is_private"]


            is_private_confirm = Navigations.objects.get(navigation_id=request_navigation_id)
            is_private_confirm.is_private = request_is_private
            is_private_confirm.save()

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