from django.contrib import admin
from django.urls import path
from .functions import (
    login_api,
    create_user_api,
    post_address_api,
    get_all_address_api,
    favorite_address_api,
    put_address_api,
    put_user_api,
    delete_address_api,
    private_address_api,
    reset_pass_api,
    get_user_api,
    forget_password_api,
)
from .functions.navigations import (
    post_navigations_api,
    get_my_navigations_api,
    get_others_navigations_api,
    favorite_navigation_api,
    private_navigation_api,
    delete_navigation_api,
    post_navigations_api,
)

urlpatterns = [
    path('login', login_api.Login.as_view()),
    path('create_user', create_user_api.CreateUser.as_view()),
    path('post_address', post_address_api.PostAddress.as_view()),
    path('get_all_address', get_all_address_api.GetAllAddress.as_view()),
    path('favorite_address', favorite_address_api.FavoriteAddress.as_view()),
    path('put_address', put_address_api.PutAddress.as_view()),
    path('put_user', put_user_api.PutUser.as_view()),
    path('delete_address', delete_address_api.DeleteAddress.as_view()),
    path('private_address', private_address_api.PrivateAddress.as_view()),
    path('reset_pass', reset_pass_api.ResetPass.as_view()),
    path('get_user', get_user_api.GetUser.as_view()),
    path('forget_password', forget_password_api.ForgetPassword.as_view()),
    path('post_navigations', post_navigations_api.PostNavigations.as_view()),
    path('get_my_navigations', get_my_navigations_api.GetMyNavigations.as_view()),
    path('get_others_navigations', get_others_navigations_api.GetOthersNavigations.as_view()),
    path('favorite_navigation', favorite_navigation_api.FavoriteNavigation.as_view()),
    path('private_navigation', private_navigation_api.PrivateNavigation.as_view()),
    path('delete_navigation', delete_navigation_api.DeleteNavigation.as_view()),
    path('post_navigations', post_navigations_api.PostNavigations.as_view()),
]