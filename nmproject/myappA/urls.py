from django.urls import path
from . import views

urlpatterns = [
    path('', views.hello_world, name='hello'),
    path('hello', views.HelloWorld.as_view(), name='test-get')
]