from django.urls import path
from . import views

app_name = 'emotion'

urlpatterns = [
   path('total/', views.total),
   path('searchage/', views.searchage),
   path('searchtime/', views.searchtime),
   
   path('calendar/', views.calendar),

   path('save/', views.save),
   path('text/', views.text),
   path('result/', views.result)
]