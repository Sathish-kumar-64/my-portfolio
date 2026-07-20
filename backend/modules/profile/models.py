from django.db import models
from modules.common.models import BaseAuditModel

class Profile(BaseAuditModel):
    full_name = models.CharField(max_length=150, default="Sathish Kumar")
    headline = models.CharField(max_length=255, default="Senior Full Stack Developer")
    bio = models.TextField(help_text="Professional biography")
    profile_image = models.ImageField(upload_to="profile/", null=True, blank=True)
    location = models.CharField(max_length=100, default="India")
    email = models.EmailField(default="sathish.kumar@example.com")
    phone = models.CharField(max_length=20, blank=True, null=True)
    available_for_freelance = models.BooleanField(default=True)
    years_experience = models.PositiveIntegerField(default=5)
    projects_completed = models.PositiveIntegerField(default=25)
    technologies_mastered = models.PositiveIntegerField(default=15)
    happy_clients = models.PositiveIntegerField(default=10)

    def __str__(self):
        return f"{self.full_name} - {self.headline}"

class SocialLink(BaseAuditModel):
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('whatsapp', 'WhatsApp'),
        ('twitter', 'Twitter/X'),
        ('leetcode', 'LeetCode'),
        ('codechef', 'CodeChef'),
        ('email', 'Email'),
        ('other', 'Other'),
    ]
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
    url = models.URLField()
    icon_name = models.CharField(max_length=50, help_text="React Icon string or Lucide icon name")
    display_order = models.PositiveIntegerField(default=0)

    class Meta(BaseAuditModel.Meta):
        ordering = ['display_order', 'platform']

    def __str__(self):
        return f"{self.get_platform_display()} - {self.url}"

class Resume(BaseAuditModel):
    title = models.CharField(max_length=100, default="Sathish_Kumar_FullStack_Resume")
    file = models.FileField(upload_to="resumes/")
    is_primary = models.BooleanField(default=True)

    def __str__(self):
        return self.title
