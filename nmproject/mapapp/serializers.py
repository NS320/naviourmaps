'''
from rest_framework import serializers
from .models import MyUser

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        fields=( 
            'user_id', 
            'biography')
        model = MyUser
'''