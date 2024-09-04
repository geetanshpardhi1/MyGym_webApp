from django.urls import path,include
from .views import goal_detail_update,MembershipDetailView,user_workout_plans,UserRegistrationView,CustomLoginView,UserChangePasswordView,LogoutAPIView,SendPasswordResetEmailView,UserPasswordResetView,MembershipCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', CustomLoginView.as_view(), name='user-login'),
    path('logout/', LogoutAPIView.as_view(), name='user-logout'),
    path('changepassword/', UserChangePasswordView.as_view(), name='change_password'),
    path('send-reset-password-email/',SendPasswordResetEmailView.as_view(),name='sendresetpassemail'),
    path('reset-password/<uid>/<token>/',UserPasswordResetView.as_view(),name='reset-password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('membership/create', MembershipCreateView.as_view(), name='create-membership'),
    path('membership/', MembershipDetailView.as_view(), name='membership-days-left'),
    path('workout-plans/', user_workout_plans, name='user_workout_plans'),
    path('goals/', goal_detail_update, name='goal-detail-update'),
]
