from rest_framework.routers import DefaultRouter
from .views import BlogViewSet, BlogCommentViewSet

router = DefaultRouter()
router.register(r'comments', BlogCommentViewSet, basename='blog-comments')
router.register(r'', BlogViewSet, basename='blogs')

urlpatterns = router.urls
