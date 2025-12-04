from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Address

User = get_user_model()


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'id', 'full_name', 'phone', 'address_line1', 
            'address_line2', 'city', 'state', 'country', 
            'postal_code', 'is_default', 'address_type', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Comprehensive user profile serializer with all user details
    """
    addresses = AddressSerializer(many=True, read_only=True)
    avatar_url = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    member_since = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'full_name', 'phone_number', 'role', 'avatar', 'avatar_url',
            'is_verified', 'date_joined', 'member_since', 'addresses'
        ]
        read_only_fields = ['id', 'email', 'date_joined', 'is_verified', 'role']
    
    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username
    
    def get_member_since(self, obj):
        return obj.date_joined.strftime('%B %Y')


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating user profile information
    """
    class Meta:
        model = User
        fields = [
            'username', 'first_name', 'last_name', 'phone_number', 'avatar'
        ]
    
    def validate_username(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value


class UserAvatarSerializer(serializers.ModelSerializer):
    """
    Dedicated serializer for avatar upload
    """
    class Meta:
        model = User
        fields = ['avatar']
    
    def validate_avatar(self, value):
        # Validate file size (max 5MB)
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("Avatar image size cannot exceed 5MB.")
        
        # Validate file type
        allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if value.content_type not in allowed_types:
            raise serializers.ValidationError(
                "Avatar must be a JPEG, PNG, or WebP image."
            )
        
        return value


class UserBasicSerializer(serializers.ModelSerializer):
    """
    Basic user info for authentication responses
    """
    avatar_url = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'avatar_url', 'role']
    
    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None
