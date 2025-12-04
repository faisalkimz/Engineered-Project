import json
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET, require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .forms import RegisterForm
from .serializers import (
    UserProfileSerializer, UserUpdateSerializer, 
    UserAvatarSerializer, UserBasicSerializer, AddressSerializer
)
from .models import Address

User = get_user_model()

# ============================================
# AUTHENTICATION APIs
# ============================================

@require_POST
def login_api(request):
    """User login endpoint"""
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)
            
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            serializer = UserBasicSerializer(user, context={'request': request})
            return JsonResponse({'user': serializer.data})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)


@require_POST
def register_api(request):
    """User registration endpoint"""
    try:
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        password_confirmation = data.get('password_confirmation')
        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        
        if not all([username, email, password]):
            return JsonResponse({'error': 'All required fields must be provided'}, status=400)
            
        if password != password_confirmation:
            return JsonResponse({'error': 'Passwords do not match'}, status=400)
            
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already registered'}, status=400)
            
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already taken'}, status=400)
            
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        
        login(request, user)
        serializer = UserBasicSerializer(user, context={'request': request})
        
        return JsonResponse({'user': serializer.data}, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)


@require_POST
def logout_api(request):
    """User logout endpoint"""
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})


@ensure_csrf_cookie
@require_GET
def user_api(request):
    """Get current authenticated user"""
    if request.user.is_authenticated:
        serializer = UserBasicSerializer(request.user, context={'request': request})
        return JsonResponse({'user': serializer.data})
    else:
        return JsonResponse({'user': None})


# ============================================
# PROFILE MANAGEMENT APIs
# ============================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_detail(request):
    """Get detailed user profile"""
    serializer = UserProfileSerializer(request.user, context={'request': request})
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile_update(request):
    """Update user profile information"""
    serializer = UserUpdateSerializer(
        request.user, 
        data=request.data, 
        partial=True,
        context={'request': request}
    )
    
    if serializer.is_valid():
        serializer.save()
        # Return full profile data
        profile_serializer = UserProfileSerializer(request.user, context={'request': request})
        return Response(profile_serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def avatar_upload(request):
    """Upload or update user avatar"""
    serializer = UserAvatarSerializer(
        request.user, 
        data=request.data,
        partial=True
    )
    
    if serializer.is_valid():
        serializer.save()
        # Return full profile data with new avatar URL
        profile_serializer = UserProfileSerializer(request.user, context={'request': request})
        return Response({
            'message': 'Avatar uploaded successfully',
            'user': profile_serializer.data
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def avatar_delete(request):
    """Delete user avatar"""
    user = request.user
    if user.avatar:
        user.avatar.delete()
        user.save()
        return Response({'message': 'Avatar deleted successfully'})
    
    return Response(
        {'error': 'No avatar to delete'}, 
        status=status.HTTP_404_NOT_FOUND
    )


# ============================================
# ADDRESS MANAGEMENT APIs
# ============================================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def address_list_create(request):
    """List all addresses or create a new one"""
    if request.method == 'GET':
        addresses = Address.objects.filter(user=request.user)
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def address_detail(request, address_id):
    """Get, update, or delete a specific address"""
    try:
        address = Address.objects.get(id=address_id, user=request.user)
    except Address.DoesNotExist:
        return Response(
            {'error': 'Address not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.method == 'GET':
        serializer = AddressSerializer(address)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        serializer = AddressSerializer(
            address, 
            data=request.data, 
            partial=request.method == 'PATCH'
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        address.delete()
        return Response(
            {'message': 'Address deleted successfully'}, 
            status=status.HTTP_204_NO_CONTENT
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def address_set_default(request, address_id):
    """Set an address as default"""
    try:
        address = Address.objects.get(id=address_id, user=request.user)
        address.is_default = True
        address.save()  # This will trigger the model's save method to unset other defaults
        return Response({'message': 'Default address updated'})
    except Address.DoesNotExist:
        return Response(
            {'error': 'Address not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )


# ============================================
# STATS & ANALYTICS APIs
# ============================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_stats(request):
    """Get user activity statistics"""
    from apps.orders.models import Order
    from apps.reviews.models import Review
    
    user = request.user
    
    # Count orders
    total_orders = Order.objects.filter(user=user).count()
    completed_orders = Order.objects.filter(
        user=user, 
        status='delivered'
    ).count()
    
    # Count reviews
    total_reviews = Review.objects.filter(user=user).count()
    
    # Count addresses
    total_addresses = Address.objects.filter(user=user).count()
    
    stats = {
        'total_orders': total_orders,
        'completed_orders': completed_orders,
        'total_reviews': total_reviews,
        'total_addresses': total_addresses,
        'member_since': user.date_joined.strftime('%B %Y'),
        'is_verified': user.is_verified,
        'role': user.role,
    }
    
    return Response(stats)

