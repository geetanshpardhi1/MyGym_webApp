# users/admin.py
from django.contrib import admin
from .models import User, MemberProfile, TrainerProfile

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'is_trainer', 'is_member', 'is_staff', 'is_active')

class MemberProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_picture', 'date_of_birth', 'gender', 'phone_number', 'address', 'register_date', 'membership_start_date', 'membership_end_date', 'membership_type')

class TrainerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_picture', 'date_of_birth', 'gender', 'phone_number', 'address', 'register_date', 'certification_details', 'specialization', 'experience_years')

admin.site.register(User, UserAdmin)
admin.site.register(MemberProfile, MemberProfileAdmin)
admin.site.register(TrainerProfile, TrainerProfileAdmin)
