from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, help_text='Password', style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, help_text='Confirm Password', style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2', 'is_trainer', 'is_member')
        extra_kwargs = {'username': {'required': False, 'allow_blank': True}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        if attrs['is_trainer'] and attrs['is_member']:
            raise serializers.ValidationError("User cannot be both a trainer and a member.")
        if not attrs['is_trainer'] and not attrs['is_member']:
            raise serializers.ValidationError("User must be either a trainer or a member.")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user



class CustomLoginSerializer(serializers.Serializer):
    email_or_username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email_or_username = attrs.get('email_or_username')
        password = attrs.get('password')

        # Check if the input is an email or username
        if '@' in email_or_username and '.' in email_or_username:
            user = authenticate(email=email_or_username, password=password)
        else:
            user = authenticate(username=email_or_username, password=password)

        if user is None:
            raise AuthenticationFailed('Invalid credentials')

        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }