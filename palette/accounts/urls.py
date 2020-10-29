from django.urls import path, include   
from . import views

app_name="accounts"

urlpatterns = [
    # 로그인
    path('user/', include('rest_auth.urls')),
    path('signup/', include('rest_auth.registration.urls')),
    path('checked/', views.checked, name='checked'),
    path('userinfo/<int:user_pk>/', views.userinfo, name='userinfo'),
    path('updated/', views.updated, name='updated'),
]
