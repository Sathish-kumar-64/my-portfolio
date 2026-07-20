from django.contrib import admin
from .models import Experience

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('company', 'role', 'employment_type', 'start_date', 'is_current', 'display_order', 'is_active')
    list_filter = ('employment_type', 'is_current', 'is_active')
    search_fields = ('company', 'role')
    list_editable = ('display_order', 'is_current', 'is_active')
