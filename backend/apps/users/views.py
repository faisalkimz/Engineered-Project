from inertia import render
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect
from django.views.decorators.http import require_POST, require_http_methods
from django.contrib.auth.decorators import login_required
from .forms import RegisterForm, LoginForm

def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    return render(request, 'Auth/Login')

@require_POST
def login_action(request):
    form = LoginForm(request.POST)
    if form.is_valid():
        user = authenticate(request, email=form.cleaned_data['email'], password=form.cleaned_data['password'])
        if user:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'Auth/Login', props={
                'errors': {'email': 'Invalid credentials'}
            })
    return render(request, 'Auth/Login', props={
        'errors': form.errors
    })

def register_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    return render(request, 'Auth/Register')

@require_POST
def register_action(request):
    form = RegisterForm(request.POST)
    if form.is_valid():
        user = form.save()
        login(request, user)
        return redirect('home')
    return render(request, 'Auth/Register', props={
        'errors': form.errors
    })

@require_POST
def logout_action(request):
    logout(request)
    return redirect('home')

@login_required
def profile_view(request):
    return render(request, 'Profile/Index', props={
        'user': {
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'email': request.user.email,
            'joined_at': request.user.date_joined.strftime('%Y-%m-%d'),
        }
    })
