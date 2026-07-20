from rest_framework import serializers
from modules.common.serializers import BaseGenericSerializer
from .models import Experience

class ExperienceSerializer(BaseGenericSerializer):
    employment_type_display = serializers.CharField(source='get_employment_type_display', read_only=True)

    class Meta(BaseGenericSerializer.Meta):
        model = Experience
        fields = '__all__'
