from rest_framework import permissions
from modules.common.viewsets import GenericCRUDViewSet
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(GenericCRUDViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    filterset_fields = ['category', 'project_status', 'is_featured', 'is_active']
    search_fields = ['title', 'short_description', 'description']
    ordering_fields = ['display_order', 'created_at', 'title']
    ordering = ['display_order', '-created_at']
