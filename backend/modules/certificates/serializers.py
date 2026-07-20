from rest_framework import serializers
from modules.common.serializers import BaseGenericSerializer
from .models import Certificate

class CertificateSerializer(BaseGenericSerializer):
    class Meta(BaseGenericSerializer.Meta):
        model = Certificate
        fields = '__all__'
