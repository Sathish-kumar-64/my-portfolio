from rest_framework import permissions
from modules.common.viewsets import GenericCRUDViewSet
from .models import Profile, SocialLink, Resume
from .serializers import ProfileSerializer, SocialLinkSerializer, ResumeSerializer

class ProfileViewSet(GenericCRUDViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ['full_name', 'headline', 'bio']

class SocialLinkViewSet(GenericCRUDViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ['platform']
    ordering_fields = ['display_order']
    ordering = ['display_order']

class ResumeViewSet(GenericCRUDViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ['title']
