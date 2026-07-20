from rest_framework import serializers
from modules.common.serializers import BaseGenericSerializer
from .models import Profile, SocialLink, Resume

class ProfileSerializer(BaseGenericSerializer):
    class Meta(BaseGenericSerializer.Meta):
        model = Profile
        fields = '__all__'

class SocialLinkSerializer(BaseGenericSerializer):
    class Meta(BaseGenericSerializer.Meta):
        model = SocialLink
        fields = '__all__'

class ResumeSerializer(BaseGenericSerializer):
    class Meta(BaseGenericSerializer.Meta):
        model = Resume
        fields = '__all__'
