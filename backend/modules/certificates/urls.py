from rest_framework.routers import DefaultRouter
from .views import CertificateViewSet

router = DefaultRouter()
router.register(r'', CertificateViewSet, basename='certificates')

urlpatterns = router.urls
