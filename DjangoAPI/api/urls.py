from django.urls import path
from . import views

urlpatterns = [
    path('hello', views.Hello),
    path('predict', views.Predictor)
]