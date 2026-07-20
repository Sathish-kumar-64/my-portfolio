from rest_framework import serializers
from modules.common.serializers import BaseGenericSerializer
from .models import Skill

class SkillSerializer(BaseGenericSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta(BaseGenericSerializer.Meta):
        model = Skill
        fields = '__all__'
