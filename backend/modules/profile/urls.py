from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, SocialLinkViewSet, ResumeViewSet

router = DefaultRouter()
router.register(r'me', ProfileViewSet, basename='profile')
router.register(r'socials', SocialLinkViewSet, basename='social-links')
router.register(r'resume', ResumeViewSet, basename='resume')

urlpatterns = router.urls
