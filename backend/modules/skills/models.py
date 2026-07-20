from django.db import models
from modules.common.models import BaseAuditModel

class Skill(BaseAuditModel):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend Development'),
        ('backend', 'Backend Development'),
        ('database', 'Databases & ORM'),
        ('cloud', 'Cloud Infrastructure'),
        ('devops', 'DevOps & CI/CD'),
        ('programming_languages', 'Programming Languages'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    proficiency = models.PositiveIntegerField(default=85, help_text="Percentage between 0 and 100")
    icon_name = models.CharField(max_length=50, help_text="React Icon string or SVG icon key")
    display_order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)

    class Meta(BaseAuditModel.Meta):
        ordering = ['category', 'display_order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_category_display()}) - {self.proficiency}%"
