import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

username = 'admin'
email = 'admin@example.com'
password = 'Password123!'

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f"Created new superuser: {username} / {password}")
else:
    u = User.objects.get(username=username)
    u.set_password(password)
    u.save()
    print(f"Reset password for existing superuser: {username} / {password}")
