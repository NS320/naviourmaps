from django.contrib import admin
from django.urls import path
from . import views
from .functions import login_api, create_user_api, post_address_api

urlpatterns = [
    path('login', login_api.Login.as_view()),
    path('create_user', create_user_api.CreateUser.as_view()),
    path('post_address', post_address_api.PostAddress.as_view()),
]