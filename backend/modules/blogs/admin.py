from django.contrib import admin
from .models import Blog, BlogComment

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_published', 'views_count', 'published_at', 'is_active')
    list_filter = ('category', 'is_published', 'is_active')
    search_fields = ('title', 'summary', 'content')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_published', 'is_active')

@admin.register(BlogComment)
class BlogCommentAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'author_email', 'blog', 'is_approved', 'created_at', 'is_active')
    list_filter = ('is_approved', 'is_active')
    search_fields = ('author_name', 'author_email', 'content')
    list_editable = ('is_approved', 'is_active')
