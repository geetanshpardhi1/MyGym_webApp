from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import datetime

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        if not extra_fields.get('username'):
            extra_fields['username'] = self.generate_unique_username(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

    def generate_unique_username(self, email):
        base_username = email.split('@')[0]
        username = base_username
        counter = 1
        while self.get_queryset().filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
        return username

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    is_trainer = models.BooleanField(default=False)
    is_member = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class MemberProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(max_length=500, blank=True)
    register_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - Member Profile"

    @property
    def membership_days_left(self):
        if self.membership_end_date:
            return (self.membership_end_date - datetime.date.today()).days
        return 0

class TrainerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(max_length=500, blank=True)
    register_date = models.DateField(auto_now_add=True)
    certification_details = models.TextField(max_length=500, blank=True)
    specialization = models.CharField(max_length=100, blank=True)
    experience_years = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.email} - Trainer Profile"
    
class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    MEMBERSHIP_CHOICES = [
        ('Base', 'Base'),
        ('Premium', 'Premium'),
        ('Gold', 'Gold')
    ]
    membership_type = models.CharField(max_length=50, choices=MEMBERSHIP_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.user.email} - {self.membership_type}"

    @property
    def days_left(self):
        if self.end_date:
            return (self.end_date - datetime.date.today()).days
        return 0