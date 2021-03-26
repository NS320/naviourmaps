from django.contrib import admin
from django.urls import path
from . import views
from .functions import login_api

urlpatterns = [
    path('login', login_api.Login.as_view()),
]