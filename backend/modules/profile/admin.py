from django.contrib import admin
from .models import Profile, SocialLink, Resume

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'headline', 'email', 'available_for_freelance', 'years_experience')
    search_fields = ('full_name', 'email', 'headline')

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'url', 'display_order', 'is_active')
    list_editable = ('display_order', 'is_active')

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_primary', 'created_at')
