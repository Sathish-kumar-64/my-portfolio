from rest_framework import serializers
from modules.common.serializers import BaseGenericSerializer
from .models import ContactMessage

class ContactMessageSerializer(BaseGenericSerializer):
    class Meta(BaseGenericSerializer.Meta):
        model = ContactMessage
        fields = '__all__'
        read_only_fields = BaseGenericSerializer.Meta.read_only_fields + ['ip_address', 'is_read', 'responded']
