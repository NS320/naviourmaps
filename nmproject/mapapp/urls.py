from django.contrib import admin
from django.urls import path
from . import views
from .functions import login_api, create_user_api, post_address_api, get_all_address_api, favorite_address_api, put_address_api

urlpatterns = [
    path('login', login_api.Login.as_view()),
    path('create_user', create_user_api.CreateUser.as_view()),
    path('post_address', post_address_api.PostAddress.as_view()),
    path('get_all_address', get_all_address_api.GetAllAddress.as_view()),
    path('favorite_address', favorite_address_api.FavoriteAddress.as_view()),
    path('put_address', put_address_api.PutAddress.as_view()),
]