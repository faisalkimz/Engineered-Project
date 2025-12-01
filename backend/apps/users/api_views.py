import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import ensure_csrf_cookie
from .forms import RegisterForm

@require_POST
def login_api(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)
            
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            })
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

@require_POST
def register_api(request):
    try:
        data = json.loads(request.body)
        # Create a form instance with the data
        # We might need to adapt the form to accept a dict or just manually validate
        # For simplicity, let's use the form if possible, or manual creation
        
        # Since RegisterForm expects POST data (QueryDict), we can try to pass the dict
        # But standard Django forms expect request.POST. 
        # Let's manually validate for this API endpoint or create a mutable QueryDict
        
        from django.http import QueryDict
        
        # Simple manual validation for now to avoid complex form hacking
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        password_confirmation = data.get('password_confirmation')
        
        if not all([username, email, password]):
            return JsonResponse({'error': 'All fields are required'}, status=400)
            
        if password != password_confirmation:
            return JsonResponse({'error': 'Passwords do not match'}, status=400)
            
        from django.contrib.auth import get_user_model
        User = get_user_model()
        
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already registered'}, status=400)
            
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already taken'}, status=400)
            
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        login(request, user)
        
        return JsonResponse({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

@require_POST
def logout_api(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})

@ensure_csrf_cookie
@require_GET
def user_api(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'user': {
                'id': request.user.id,
                'username': request.user.username,
                'email': request.user.email,
                'first_name': request.user.first_name,
                'last_name': request.user.last_name
            }
        })
    else:
        return JsonResponse({'user': None})
