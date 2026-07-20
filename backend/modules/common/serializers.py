from rest_framework import serializers

class BaseGenericSerializer(serializers.ModelSerializer):
    """
    Base Generic Serializer ensuring audit fields are read-only
    and automatically mapped across all master entities.
    """
    created_by_username = serializers.ReadOnlyField(source='created_by.username', default=None)
    updated_by_username = serializers.ReadOnlyField(source='updated_by.username', default=None)

    class Meta:
        abstract = True
        read_only_fields = ['id', 'created_at', 'updated_at', 'created_by', 'updated_by', 'created_by_username', 'updated_by_username']
