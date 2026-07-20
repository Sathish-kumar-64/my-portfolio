from django.db import models
from modules.common.models import BaseAuditModel

class Certificate(BaseAuditModel):
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=150)
    issue_date = models.DateField()
    expiration_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=100, blank=True, null=True)
    credential_url = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to="certificates/", null=True, blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta(BaseAuditModel.Meta):
        ordering = ['display_order', '-issue_date']

    def __str__(self):
        return f"{self.title} - {self.organization}"
