from django.urls import path,include
from .views import goal_detail_update,RemoveProfilePictureView,MembershipCreateOrUpdateView,MembershipDetailView,CookieTokenRefreshView,user_workout_plans,UserRegistrationView,CustomLoginView,UserChangePasswordView,LogoutAPIView,SendPasswordResetEmailView,UserPasswordResetView,MemberProfileRetrieveUpdateView




urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', CustomLoginView.as_view(), name='user-login'),
    path('logout/', LogoutAPIView.as_view(), name='user-logout'),
    path('changepassword/', UserChangePasswordView.as_view(), name='change_password'),
    path('send-reset-password-email/',SendPasswordResetEmailView.as_view(),name='sendresetpassemail'),
    path('reset-password/<uid>/<token>/',UserPasswordResetView.as_view(),name='reset-password'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', MemberProfileRetrieveUpdateView.as_view(), name='member-profile'),
    path('remove-profile-picture/', RemoveProfilePictureView.as_view(), name='remove-profile-picture'),
    path('membership/create', MembershipCreateOrUpdateView.as_view(), name='create-membership'),
    path('membership/', MembershipDetailView.as_view(), name='membership-days-left'),
    path('workout-plans/', user_workout_plans, name='user_workout_plans'),
    path('goals/', goal_detail_update, name='goal-detail-update'),
]
