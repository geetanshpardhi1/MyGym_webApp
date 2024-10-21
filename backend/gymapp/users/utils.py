from django.conf import settings
from django.core.mail import send_mail


def send_email(resetlink,recipient_email):
    subject = "PASSWORD RESET LINK"
    message = resetlink
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [recipient_email]
    send_mail(subject,message,from_email,recipient_list)
    
    
def send_otp_email(email,otp):
    subject = "YOUR ACCOUNT VERIFICATION OTP"
    message = f"Yout otp is {otp}"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject,message,from_email,recipient_list)