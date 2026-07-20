from rest_framework import serializers
from modules.common.serializers import BaseGenericSerializer
from .models import Project

class ProjectSerializer(BaseGenericSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    status_display = serializers.CharField(source='get_project_status_display', read_only=True)

    class Meta(BaseGenericSerializer.Meta):
        model = Project
        fields = '__all__'
