from rest_framework import generics, status
from rest_framework.response import Response
from .models import User
from .serializers import UserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderer
from rest_framework.views import APIView
from .serializers import CustomLoginSerializer

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
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    
class CustomLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, *args, **kwargs):
        serializer = CustomLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)