from django.contrib.auth.models import User
from django import forms
from CodeShareIo.models import Users

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'is_superuser']


class ProfileForm(forms.ModelForm):

    class Meta:
        model = Users
        fields = ['user_profile_picture', 'user_banner_picture', 'mobile_phone', 'birthday', 'country', 'city', 'gender']