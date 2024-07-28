from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import MemberProfile, TrainerProfile, User

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.is_member:
            MemberProfile.objects.create(user=instance)
        if instance.is_trainer:
            TrainerProfile.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    if instance.is_member:
        instance.memberprofile.save()
    if instance.is_trainer:
        instance.trainerprofile.save()