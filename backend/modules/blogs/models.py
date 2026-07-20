from django.db import models
from django.utils.text import slugify
from modules.common.models import BaseAuditModel

class Blog(BaseAuditModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=280, unique=True, blank=True)
    summary = models.TextField(help_text="Short abstract or summary for cards")
    content = models.TextField(help_text="Full markdown or HTML content")
    cover_image = models.ImageField(upload_to="blogs/", null=True, blank=True)
    category = models.CharField(max_length=100, default="Web Development")
    tags = models.JSONField(default=list, help_text="List of tag strings e.g. ['React', 'Django', 'DevOps']")
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(auto_now_add=True)
    views_count = models.PositiveIntegerField(default=0)

    class Meta(BaseAuditModel.Meta):
        ordering = ['-published_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class BlogComment(BaseAuditModel):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='comments')
    author_name = models.CharField(max_length=100)
    author_email = models.EmailField()
    content = models.TextField()
    is_approved = models.BooleanField(default=True)

    class Meta(BaseAuditModel.Meta):
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment by {self.author_name} on {self.blog.title}"
