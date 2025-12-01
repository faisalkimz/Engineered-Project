"""
Production settings - extends base settings.
"""
from .base import *

DEBUG = False

# Security settings
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Database - PostgreSQL in production
if config('DB_NAME', default=''):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': config('DB_NAME'),
            'USER': config('DB_USER'),
            'PASSWORD': config('DB_PASSWORD'),
            'HOST': config('DB_HOST', default='localhost'),
            'PORT': config('DB_PORT', default='5432'),
            'CONN_MAX_AGE': 600,
        }
    }

# Static files - use WhiteNoise for production
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Logging for production
LOGGING['handlers']['file'] = {
    'class': 'logging.handlers.RotatingFileHandler',
    'filename': BASE_DIR / 'logs' / 'django.log',
    'maxBytes': 1024 * 1024 * 10,  # 10 MB
    'backupCount': 10,
    'formatter': 'verbose',
}

LOGGING['root']['handlers'] = ['console', 'file']
LOGGING['loggers']['django']['handlers'] = ['console', 'file']

# Email - use SMTP in production
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

# Ensure ALLOWED_HOSTS is set
if not ALLOWED_HOSTS or ALLOWED_HOSTS == ['*']:
    raise ValueError('ALLOWED_HOSTS must be set in production!')
