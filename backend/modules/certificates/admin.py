from django.contrib import admin
from .models import Certificate

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'organization', 'issue_date', 'credential_id', 'display_order', 'is_active')
    list_filter = ('organization', 'is_active')
    search_fields = ('title', 'organization', 'credential_id')
    list_editable = ('display_order', 'is_active')
