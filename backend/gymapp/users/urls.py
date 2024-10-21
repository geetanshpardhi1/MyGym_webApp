from django.urls import path,include
from .views import VerifyOTP,ResendVerificationOTPView,goal_detail_update,RemoveProfilePictureView,MembershipCreateOrUpdateView,MembershipDetailView,CookieTokenRefreshView,user_workout_plans,UserRegistrationView,CustomLoginView,UserChangePasswordView,LogoutAPIView,SendPasswordResetEmailView,UserPasswordResetView,MemberProfileRetrieveUpdateView
from users.api.api_razorpay import CreateOrderApiView,TransactionApiView



urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('verify/', VerifyOTP.as_view(), name='user-verification'),
    path('verify/resendOTP/', ResendVerificationOTPView.as_view(), name='resendOTP'),
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
    
    #razor pay payment gateway urls
    path("order/create/",CreateOrderApiView.as_view(),name="create_orderAPI"),
    path("order/complete/",TransactionApiView.as_view(),name="complete_orderAPI")
    
]
