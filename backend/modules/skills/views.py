from rest_framework import permissions
from modules.common.viewsets import GenericCRUDViewSet
from .models import Skill
from .serializers import SkillSerializer

class SkillViewSet(GenericCRUDViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['category', 'is_featured', 'is_active']
    search_fields = ['name', 'category']
    ordering_fields = ['display_order', 'proficiency', 'name', 'created_at']
    ordering = ['display_order', '-proficiency']
