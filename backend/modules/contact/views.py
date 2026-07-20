import logging
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import permissions, status
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response
from modules.common.viewsets import GenericCRUDViewSet
from .models import ContactMessage
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)

class ContactThrottle(AnonRateThrottle):
    rate = '5/hour'

class ContactMessageViewSet(GenericCRUDViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get_throttles(self):
        if self.action == 'create':
            return [ContactThrottle()]
        return super().get_throttles()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Extract client IP
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')

        contact_msg = serializer.save(ip_address=ip)

        # Attempt to dispatch email notification
        try:
            subject = f"Portfolio Contact: {contact_msg.subject} from {contact_msg.name}"
            email_body = f"""
New message received on Portfolio Website:

Name: {contact_msg.name}
Email: {contact_msg.email}
Subject: {contact_msg.subject}
IP: {contact_msg.ip_address}

Message:
----------------------------------------
{contact_msg.message}
----------------------------------------
            """
            send_mail(
                subject=subject,
                message=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=True
            )
        except Exception as e:
            logger.error(f"Failed to send contact notification email: {e}")

        return Response({
            'success': True,
            'message': 'Thank you for your message! Sathish will get back to you shortly.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
