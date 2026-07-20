from django.db import models
from modules.common.models import BaseAuditModel

class Experience(BaseAuditModel):
    EMPLOYMENT_CHOICES = [
        ('full_time', 'Full-time'),
        ('part_time', 'Part-time'),
        ('contract', 'Contract'),
        ('freelance', 'Freelance'),
        ('internship', 'Internship'),
    ]

    company = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    location = models.CharField(max_length=100, default="Remote")
    employment_type = models.CharField(max_length=50, choices=EMPLOYMENT_CHOICES, default='full_time')
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    responsibilities = models.JSONField(default=list, help_text="List of key achievement bullet points")
    technologies = models.JSONField(default=list, help_text="List of technology names e.g. ['Django', 'React']")
    company_logo = models.ImageField(upload_to="companies/", null=True, blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta(BaseAuditModel.Meta):
        ordering = ['display_order', '-start_date']

    def __str__(self):
        return f"{self.role} at {self.company}"
