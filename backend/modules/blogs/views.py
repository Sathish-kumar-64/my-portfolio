from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from modules.common.viewsets import GenericCRUDViewSet
from .models import Blog, BlogComment
from .serializers import BlogSerializer, BlogCommentSerializer

class BlogViewSet(GenericCRUDViewSet):
    queryset = Blog.objects.filter(is_published=True)
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    filterset_fields = ['category', 'is_published', 'is_active']
    search_fields = ['title', 'summary', 'content', 'category']
    ordering_fields = ['published_at', 'views_count', 'title']
    ordering = ['-published_at']

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save(update_fields=['views_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.AllowAny])
    def add_comment(self, request, slug=None):
        blog = self.get_object()
        serializer = BlogCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(blog=blog, is_approved=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlogCommentViewSet(GenericCRUDViewSet):
    queryset = BlogComment.objects.all()
    serializer_class = BlogCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['blog', 'is_approved', 'is_active']
    search_fields = ['author_name', 'author_email', 'content']
