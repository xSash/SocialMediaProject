from django.views import generic
from models import Users, Post
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout as auth_logout
from django.views.generic import View
from forms import UserForm
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse


class IndexView(generic.ListView):
    template_name = 'CodeShareIo/index.html'
    context_object_name = 'all_user_items'

    def get_queryset(self):
        return Users.objects.all()


class ProfileView(generic.DetailView):
    model = User
    template_name = 'CodeShareIo/userProfile.html'
    slug_field = "username"


class FeedView(View):
    form_class = User.objects.all()
    user_post = Post.objects.all()
    template_name = 'CodeShareIo/feed.html'
    # display blank form
    post = user_post
    def get_queryset(self):
        return self.post

    def get(self, request):
        if not request.user.is_authenticated():
            return redirect('CodeShareIo:login')
        else:
            items = self.form_class
            num_of_post = Post.objects.filter(user=request.user).count()
            return render(request, self.template_name, {'items': items, 'post': self.post, 'num_of_post': num_of_post})


class MobileApplicationView(generic.ListView):
    template_name = 'CodeShareIo/mobile.html'

    def get_queryset(self):
        return Users.objects.all()


class ResetPasswordView(generic.ListView):
    template_name = 'CodeShareIo/resetPassword.html'

    def get_queryset(self):
        return Users.objects.all()


class UserFormView(View):
    form_class = UserForm
    template_name = 'CodeShareIo/register.html'

    # display blank form
    def get(self, request):
        if request.user.is_authenticated():
            auth_logout(request)

        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})

    # Process form data
    def post(self, request):
        if request.method == 'POST':
            data_profile = request.POST['profilePicture']
            data_banner = request.POST['profileBanner']
            data_phone = request.POST['mobileNumber']
            data_birth = request.POST['date']
            data_country = request.POST['country']
            data_city = request.POST['city']
            data_gender = request.POST['gender']
            data_bio = request.POST['bio']

            password = request.POST['password']
            # Cleaned normalized data
            user = User.objects.create_user(
                first_name=request.POST['firstname'],
                last_name=request.POST['lastname'],
                username=request.POST['username'],
                password=password,
                email=request.POST['email']
            )
            user.set_password(password)

            user.save()

            user_profile = Users.objects.create(
                user=user,
                user_profile_picture=data_profile,
                user_banner_picture=data_banner,
                mobile_phone=data_phone,
                birthday=data_birth,
                country=data_country,
                city=data_city,
                gender=data_gender,
                bio=data_bio
            )

            user_profile.save()
            return redirect('CodeShareIo:login')


class LoginView(View):
    form_class = UserForm
    template_name = 'CodeShareIo/login.html'
    context_object_name = 'user'

    def get_queryset(self):
        return Users.objects.all()

    # display blank form
    def get(self, request):

        if request.user.is_authenticated():
            return redirect('CodeShareIo:feed')

        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})

    # Process form data
    def post(self, request):

        if request.method == 'POST':
            password = request.POST['password']
            username = request.POST['username']

            # returns User objects if credentials are correct
            if username == '' or password == '':
                error_message = 'error'
                return render(request, self.template_name, {error_message: 'error'})

            if username != '' and password != '':
                user = authenticate(username=username, password=password)
                if user is not None:
                    if user.is_active:
                        login(request, user)
                    return redirect('CodeShareIo:feed')

                return render(request, self.template_name, {user: 'user'})


def PostChat(request):
    if request.method == "POST":
        msg = request.POST.get('msgbox', None)
        c = Post(user=request.user, content=msg)
        if msg != '':
            c.save()
        return JsonResponse({'msg': msg, 'user': c.user.username})
    else:
        return HttpResponse('Request must be POST.')

def MessagesChat(request):
    c = Post.objects.all().order_by('-pub_date')
    return render(request, 'CodeShareIo/messagesChat.html', {'chat': c})


def FeedConnectedUser(request):
    u = None
    if request.method == 'POST':
        u = request.POST.get('user1')

    print "*******************************", u

    user = User.objects.filter(username="@admin")
    print "user : ", user
    c = Post.objects.all().filter(user=user)
    return render(request, 'CodeShareIo/lolz.html', {'chat': c})

