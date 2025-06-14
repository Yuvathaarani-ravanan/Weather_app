from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('current/', views.current_weather, name='current_weather'),
    path('daily/', views.daily_weather, name='daily_weather'),
    path('forecast/', views.forecast_weather, name='forecast_weather'),
]
