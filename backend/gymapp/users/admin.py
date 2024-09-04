# users/admin.py
from django.contrib import admin
from .models import User, MemberProfile, TrainerProfile, Membership, WorkoutPlan, Goal

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'is_trainer', 'is_member', 'is_staff', 'is_active')

class MemberProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_picture', 'date_of_birth', 'gender', 'phone_number', 'address', 'register_date')

class TrainerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_picture', 'date_of_birth', 'gender', 'phone_number', 'address', 'register_date', 'certification_details', 'specialization', 'experience_years')

class MembershipAdmin(admin.ModelAdmin):
    list_display = ('user', 'membership_type', 'duration', 'start_date', 'end_date')


admin.site.register(User, UserAdmin)
admin.site.register(MemberProfile, MemberProfileAdmin)
admin.site.register(TrainerProfile, TrainerProfileAdmin)
admin.site.register(Membership, MembershipAdmin) 
admin.site.register(WorkoutPlan)
admin.site.register(Goal)