from rest_framework import permissions
from modules.common.viewsets import GenericCRUDViewSet
from .models import Certificate
from .serializers import CertificateSerializer

class CertificateViewSet(GenericCRUDViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['organization', 'is_active']
    search_fields = ['title', 'organization', 'credential_id']
    ordering_fields = ['display_order', 'issue_date', 'title']
    ordering = ['display_order', '-issue_date']
