from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'project_status', 'is_featured', 'display_order', 'is_active')
    list_filter = ('category', 'project_status', 'is_featured', 'is_active')
    search_fields = ('title', 'description', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('project_status', 'is_featured', 'display_order', 'is_active')
