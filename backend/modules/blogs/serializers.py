from rest_framework import serializers
from modules.common.serializers import BaseGenericSerializer
from .models import Blog, BlogComment

class BlogCommentSerializer(BaseGenericSerializer):
    class Meta(BaseGenericSerializer.Meta):
        model = BlogComment
        fields = '__all__'
        read_only_fields = BaseGenericSerializer.Meta.read_only_fields + ['is_approved']

class BlogSerializer(BaseGenericSerializer):
    comments = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta(BaseGenericSerializer.Meta):
        model = Blog
        fields = '__all__'

    def get_comments(self, obj):
        approved_comments = obj.comments.filter(is_approved=True, is_active=True)
        return BlogCommentSerializer(approved_comments, many=True).data

    def get_comments_count(self, obj):
        return obj.comments.filter(is_approved=True, is_active=True).count()
