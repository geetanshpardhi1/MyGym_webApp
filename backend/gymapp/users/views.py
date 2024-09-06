from rest_framework import generics, status
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes,renderer_classes
from rest_framework.response import Response
from .models import User,Membership,WorkoutPlan,Goal
from .serializers import UserRegistrationSerializer,MembershipSerializer,WorkoutPlanSerializer,GoalSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import CustomLoginSerializer,UserChangePasswordSerializer,SendPasswordResetEmailSerializer,UserPasswordResetSerializer

#custom view for token refresh
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            return Response({"error": "Refresh token missing"}, status=400)
        
        serializer = TokenRefreshSerializer(data={"refresh": refresh_token})

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            return Response({"error": "Invalid token"}, status=401)  # Custom error message for invalid token

        return Response(serializer.validated_data)


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    renderer_classes = [UserRenderer]
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)
        
        response_data = {
            'access': str(refresh.access_token),
            'user': {
                    'username': user.username,
                    'email': user.email,
                    'is_trainer': user.is_trainer,
                    'is_member': user.is_member,
                }
        }
        
        response = Response(response_data, status=status.HTTP_201_CREATED)
        
        # refresh token as an HttpOnly cookie
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=settings.SECURE_COOKIE, 
            samesite='Lax' 
        )
        return response
    
class CustomLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, *args, **kwargs):
        serializer = CustomLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        
        access = validated_data.get('access')
        refresh = validated_data.get('refresh')
        user = validated_data.get('user')

        response = Response({
            'access': access,
            'user': user
        }, status=status.HTTP_200_OK)

        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=settings.SECURE_COOKIE,  
            samesite='Lax' 
        )

        return response
    
class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self,request,format=None):
        serializer = UserChangePasswordSerializer(data=request.data,context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
           return Response({'msg':'Password Changed Successful'},status=status.HTTP_200_OK) 
       
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 
    
class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid token or token not provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        
class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,format=None):
        serializer =SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            reset_link = serializer.validated_data.get('reset_link')
            return Response({'reset_link': reset_link,'msg':'Password Reset Link sent, Please check your email'},status=status.HTTP_200_OK) 
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 
    
class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,uid,token,format=None):
        serializer = UserPasswordResetSerializer(data=request.data,context={'uid':uid,'token':token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Changed'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class MembershipCreateOrUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            membership, created = Membership.objects.get_or_create(user=user)
            serializer = MembershipSerializer(membership, data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
                return Response(serializer.data, status=status_code)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        
class MembershipDetailView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes =[UserRenderer]
    def get(self, request):
        try:
            membership = Membership.objects.get(user=request.user)
            serializer = MembershipSerializer(membership)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Membership.DoesNotExist:
            return Response({"No active membership found."}, status=status.HTTP_404_NOT_FOUND)        
        
        
@api_view(['GET', 'POST'])
@renderer_classes([UserRenderer])
@permission_classes([IsAuthenticated])
def user_workout_plans(request):
    user = request.user

    if request.method == 'GET':
        # Get all workout plans for the authenticated user
        workout_plans = WorkoutPlan.objects.filter(user=user)
        serializer = WorkoutPlanSerializer(workout_plans, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Check if a workout plan for the day already exists
        day_of_week = request.data.get('day_of_week')
        existing_plan = WorkoutPlan.objects.filter(user=user, day_of_week=day_of_week).first()

        if existing_plan:
            # Update the existing plan
            serializer = WorkoutPlanSerializer(existing_plan, data=request.data)
        else:
            # Create a new workout plan
            serializer = WorkoutPlanSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

        
@api_view(['GET', 'POST'])
@renderer_classes([UserRenderer])
@permission_classes([IsAuthenticated])
def goal_detail_update(request):
    try:
        goal = Goal.objects.get(user=request.user)
    except Goal.DoesNotExist:
        return Response({"Goal not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GoalSerializer(goal)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = GoalSerializer(goal, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

