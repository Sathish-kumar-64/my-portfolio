from django.contrib import admin
from .models import Skill

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'is_featured', 'display_order', 'is_active')
    list_filter = ('category', 'is_featured', 'is_active')
    search_fields = ('name',)
    list_editable = ('proficiency', 'display_order', 'is_featured', 'is_active')
