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
    height = models.FloatField(null=True, blank=True) 
    weight = models.FloatField(null=True, blank=True)  
    register_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - Member Profile"
    
    def remove_profile_picture(self):
        self.profile_picture.delete(save=False)
        self.profile_picture = None
        self.save()

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
    
    MEMBERSHIP_STATUS_CHOICES = [
        ('Member', 'Member'),
        ('Not A Member', 'Not A Member'),
    ]
    
    MEMBERSHIP_PLAN_CHOICES = [
        ('Base', 'Base'),
        ('Premium', 'Premium'),
        ('Gold', 'Gold')
    ]
    
    DURATION_CHOICES = [
        ('Monthly', 30),
        ('Quarterly', 90),
        ('Yearly', 365)
    ]
    
    membership_status = models.CharField(max_length=50, choices=MEMBERSHIP_STATUS_CHOICES, default='Not A Member')
    membership_type = models.CharField(max_length=50, choices=MEMBERSHIP_PLAN_CHOICES, blank=True, null=True)
    duration = models.CharField(max_length=50, choices=DURATION_CHOICES, blank=True, null=True)
    start_date = models.DateField(editable=False, blank=True, null=True)
    end_date = models.DateField(editable=False, blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.membership_type and self.duration:
          
            if not self.start_date:
                self.start_date = datetime.date.today() + datetime.timedelta(days=1)
            duration_days = dict(self.DURATION_CHOICES)[self.duration]
            self.end_date = self.start_date + datetime.timedelta(days=duration_days)
            
            self.membership_status = 'Member'
            
        else:
            self.membership_status = 'Not A Member'
            self.start_date = None
            self.end_date = None

        super().save(*args, **kwargs)
        
    @property
    def days_left(self):
        if self.end_date:
            today = datetime.date.today()
            if self.end_date > today:
                return (self.end_date - today).days
        return 0

    def __str__(self):
        return f"{self.user.email} - {self.membership_type} ({self.duration})"


class WorkoutPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # Day of the week
    DAY_CHOICES = [
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    ]
    day_of_week = models.CharField(max_length=10, choices=DAY_CHOICES)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    duration = models.IntegerField()
    INTENSITY_CHOICES = [
        ('Low', 'Low'),
        ('Moderate', 'Moderate'),
        ('High', 'High'),
    ]
    intensity = models.CharField(max_length=10, choices=INTENSITY_CHOICES, blank=True, null=True)
    
    def __str__(self):
        return f'{self.user.username} - {self.day_of_week} - {self.title}'
    
    class Meta:
        unique_together = ('user', 'day_of_week')
        
class Goal(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    calorie_goal = models.PositiveIntegerField(default=1500) 
    daily_steps_goal = models.PositiveIntegerField(default=5000) 
    sleep_goal = models.DecimalField(max_digits=4, decimal_places=1, default=8.0)
    water_intake_goal = models.DecimalField(max_digits=4, decimal_places=2, default=3.00) 

    def __str__(self):
        return f"{self.user.username}'s Goals"