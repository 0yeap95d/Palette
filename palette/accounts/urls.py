from django.urls import path, include   
from . import views
from django.conf.urls import url
from allauth.account.views import confirm_email

app_name="accounts"

urlpatterns = [
    # 로그인
    path('user/', include('rest_auth.urls')),
    # 회원가입
    path('signup/', include('rest_auth.registration.urls')),
    # 회원가입(카카오)
    # path('checked/', views.checked, name='checked'),
    # # 유저정보추가(최초 로그인시)
    # path('initinfo/<int:user_pk>/', views.initinfo, name='initinfo'),
    # # 유저정보불러오기
    # path('userinfo/<int:user_pk>/', views.userinfo, name='userinfo'),
    # # 유저정보수정
    # path('updated/', views.updated, name='updated'),
    
]
