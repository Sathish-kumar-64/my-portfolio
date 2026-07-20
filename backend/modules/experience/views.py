from rest_framework import permissions
from modules.common.viewsets import GenericCRUDViewSet
from .models import Experience
from .serializers import ExperienceSerializer

class ExperienceViewSet(GenericCRUDViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['employment_type', 'is_current', 'is_active']
    search_fields = ['company', 'role', 'location']
    ordering_fields = ['display_order', 'start_date', 'company']
    ordering = ['display_order', '-start_date']
