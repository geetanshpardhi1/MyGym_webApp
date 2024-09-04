from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import MemberProfile, TrainerProfile, User,Goal

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.is_member:
            MemberProfile.objects.create(user=instance)
            Goal.objects.create(user=instance, sleep_goal=8, daily_steps_goal=8000, calorie_goal=2000)
        if instance.is_trainer:
            TrainerProfile.objects.create(user=instance)
            Goal.objects.create(user=instance, sleep_goal=8, daily_steps_goal=8000, calorie_goal=2000)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    if instance.is_member:
        instance.memberprofile.save()
    if instance.is_trainer:
        instance.trainerprofile.save()