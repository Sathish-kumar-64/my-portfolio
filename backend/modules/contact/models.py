from django.db import models
from modules.common.models import BaseAuditModel

class ContactMessage(BaseAuditModel):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    is_read = models.BooleanField(default=False)
    responded = models.BooleanField(default=False)

    class Meta(BaseAuditModel.Meta):
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"
