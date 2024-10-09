from rest_framework import serializers
from .models import User,MemberProfile
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import serializers
from .models import Membership,WorkoutPlan,Goal,MemberProfile
from .utils import send_email


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
            'user': {
                    'username': user.username,
                    'email': user.email,
                    'is_trainer': user.is_trainer,
                    'is_member': user.is_member,
                }
        }
        
class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password2 = serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    
    class Meta:
        fields = ['password','password2']
        
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError('Password and Confirmpassword do not match')
        user.set_password(password)
        user.save()
        return attrs
    
    
class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        fields = ['email']
        
    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = 'http://localhost:5173/api/user/reset-password/'+uid+'/'+token+'/'
            attrs['reset_link'] = link
            print(link)
            send_email(link,email)
            return attrs
            
        else:
            raise serializers.ValidationError("You are not a registered user")
        
class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password2 = serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    
    class Meta:
        fields = ['password','password2']
        
        
    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token =self.context.get('token')
            if password != password2:
                raise serializers.ValidationError("Passwords do not match")
            
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise serializers.ValidationError("Token is corrupted or expired")
            
            user.set_password(password)
            user.save()
            return attrs
        
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator.check_token(user,token)
            raise serializers.ValidationError("Token is corrupted or expired")
        
class MembershipSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Membership
        fields = ['membership_status', 'membership_type', 'duration', 'start_date', 'end_date', 'days_left']
        read_only_fields = ['start_date', 'end_date', 'days_left']

    def get_days_left(self, obj):
        return obj.days_left

    def create(self, validated_data):
       
        username = validated_data.pop('username', None)
        if username:
           user = User.objects.get(username=username)
        else:
            raise serializers.ValidationError("User email or username must be provided.")
        
        return Membership.objects.create(user=user, **validated_data)


class WorkoutPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutPlan
        fields = ['id', 'day_of_week','duration', 'title', 'description', 'intensity']
        
class GoalSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Goal
        fields = ['id','calorie_goal', 'daily_steps_goal', 'sleep_goal', 'water_intake_goal']
        read_only_fields = ['id']
        

class MemberProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberProfile
        fields = [
            'profile_picture',
            'date_of_birth',
            'gender',
            'phone_number',
            'address',
            'height',
            'weight',
        ]
        extra_kwargs = {
            'profile_picture': {'required': False},
            'date_of_birth': {'required': False},
            'gender': {'required': False},
            'phone_number': {'required': False},
            'address': {'required': False},
            'height': {'required': False},
            'weight': {'required': False},
        }

    def update(self, instance, validated_data):
        profile_picture = validated_data.pop('profile_picture', None)
        if profile_picture:
            instance.profile_picture = profile_picture

        return super().update(instance, validated_data)
