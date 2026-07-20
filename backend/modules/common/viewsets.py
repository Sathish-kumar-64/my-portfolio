from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from modules.common.pagination import StandardResultsSetPagination

class GenericCRUDViewSet(viewsets.ModelViewSet):
    """
    Reusable Generic CRUD Engine ViewSet providing Create, Read, Update, Delete,
    Pagination, Filtering, Searching, Sorting, and Audit binding out-of-the-box.
    """
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    # Defaults to be overridden by subclasses
    search_fields = []
    filterset_fields = []
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(created_by=user, updated_by=user)

    def perform_update(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(updated_by=user)

    def perform_destroy(self, instance):
        # Default to soft delete if supported by instance
        if hasattr(instance, 'delete'):
            instance.delete(soft=True)
        else:
            instance.delete()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            'success': True,
            'message': f"{instance.__class__.__name__} deleted successfully."
        }, status=status.HTTP_200_OK)
