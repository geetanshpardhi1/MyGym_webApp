from django.urls import path,include
from .views import UserRegistrationView,CustomLoginView,UserChangePasswordView,LogoutAPIView,SendPasswordResetEmailView,UserPasswordResetView,MembershipCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', CustomLoginView.as_view(), name='user-login'),
    path('logout/', LogoutAPIView.as_view(), name='user-logout'),
    path('changepassword/', UserChangePasswordView.as_view(), name='change_password'),
    path('send-reset-password-email/',SendPasswordResetEmailView.as_view(),name='sendresetpassemail'),
    path('reset-password/<uid>/<token>/',UserPasswordResetView.as_view(),name='reset-password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create-membership/', MembershipCreateView.as_view(), name='create-membership'),
]
