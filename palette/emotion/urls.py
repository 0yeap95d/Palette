from django.urls import path
from . import views

app_name = 'emotion'

urlpatterns = [
   path('top/', views.top),
   path('statistics/', views.statistics),
   path('calendar/', views.calendar),

   path('save/', views.save),
   path('text/', views.text),
   path('result/', views.result)
]