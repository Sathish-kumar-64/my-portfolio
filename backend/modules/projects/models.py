from django.db import models
from django.utils.text import slugify
from modules.common.models import BaseAuditModel

class Project(BaseAuditModel):
    CATEGORY_CHOICES = [
        ('fullstack', 'Full Stack'),
        ('frontend', 'Frontend'),
        ('backend', 'Backend API'),
        ('mobile', 'Mobile Application'),
        ('devops', 'DevOps / Infrastructure'),
        ('ai_ml', 'AI / Machine Learning'),
    ]

    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('in_progress', 'In Progress'),
        ('maintenance', 'Under Maintenance'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    short_description = models.CharField(max_length=300)
    description = models.TextField()
    features = models.JSONField(default=list, help_text="List of key project feature bullet points")
    tech_stack = models.JSONField(default=list, help_text="List of technology names e.g. ['React', 'Django', 'PostgreSQL']")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='fullstack')
    project_status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='completed')
    github_url = models.URLField(blank=True, null=True)
    live_demo_url = models.URLField(blank=True, null=True)
    featured_image = models.ImageField(upload_to="projects/", null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    class Meta(BaseAuditModel.Meta):
        ordering = ['display_order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"
