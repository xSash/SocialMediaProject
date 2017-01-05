from django.views import generic
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout as auth_logout
from django.views.generic import View
from forms import UserForm
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.views.generic.edit import UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from CodeShareIo.models import Users, Post


class IndexView(generic.ListView):
    template_name = 'CodeShareIo/index.html'
    context_object_name = 'all_user_items'

    def get_queryset(self):
        return Users.objects.all()


class ProfileView(generic.DetailView):
    model = User
    model2 = Post
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


class PostDelete(DeleteView):
    model = Post
    success_url = reverse_lazy('CodeShareIo:feed')

    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)


class PostDeleteProfile(DeleteView):
    model = Post
    success_url = reverse_lazy('CodeShareIo:profile')

    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)


class UpdateProfile(UpdateView):
    model = User
    success_url = reverse_lazy('CodeShareIo:feed')
    user = User.objects.all()

    def get(self, request, *args, **kwargs):
        return self.user(request, *args, **kwargs)


class MobileApplicationView(generic.ListView):
    template_name = 'CodeShareIo/mobile.html'

    def get_queryset(self):
        return Users.objects.all()


class ResetPasswordView(View):
    template_name = 'CodeShareIo/resetPassword.html'
    context_object_name = 'user'

    def get(self, request):
        return render(request, self.template_name)

    # Process form data

    def post(self, request):

        if request.method == 'POST':
            email = request.POST['email']

            # returns User objects if credentials are correct
            if email == '':
                error_message = "The username or password is incorrect"
                return render(request, self.template_name, {error_message: 'error'})

            if email != '':
                print email
                user = User.objects.get(email=email)
                print email
                print "User to reset : ", user
                if user is not None:
                    print "Not None"
                    if user.is_active:
                        # send email to this user for reset
                        return render(request, 'CodeShareIo/reset.html', {email: 'username'})
                else:
                    return render(request, self.template_name)


class ResetView(View):

    form_class = UserForm
    template_name = 'CodeShareIo/reset.html'

    # display blank form
    def get(self, request):
        if request.user.is_authenticated():
            auth_logout(request)
        return render(request, self.template_name)

    # Process form data
    def post(self, request):
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']
            repeatpassword = request.POST['repeatePassword']

            if username == '' or password == '' or repeatpassword == '':
                error_message = "The username or password is incorrect"
                return render(request, self.template_name, {error_message: 'error'})

            if username != '' and password == repeatpassword:
                user = User.objects.get(username=username)
                if user is not None:
                    print "Not None"
                    if user.is_active:
                        print "Active"
                        user.set_password(password)
                        user.save()
                    return redirect('CodeShareIo:login')
                else:
                    return render(request, self.template_name)


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
            data_profile = request.FILES['profilePicture']
            data_banner = request.FILES['profileBanner']
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
                error_message = "The username or password is incorrect"
                return render(request, self.template_name, {error_message: 'error'})

            if username != '' and password != '':
                user = authenticate(username=username, password=password)
                if user is not None:
                    if user.is_active:
                        login(request, user)
                    return redirect('CodeShareIo:feed')

                return render(request, self.template_name, {user: 'user'})


def postchat(request):
    if request.method == "POST":
        msg = request.POST.get('msgbox', None)
        c = Post(user=request.user, content=msg)
        if msg != '':
            c.save()
        return JsonResponse({'msg': msg, 'user': c.user.username})
    else:
        return HttpResponse('Request must be POST.')


def messageschat(request):
    c = Post.objects.all().order_by('-pub_date')
    return render(request, 'CodeShareIo/messagesChat.html', {'chat': c})


def profileview(request):
    u = None
    if request.method == 'POST':
        u = request.POST.get('user1')

    print "Method : Profieview", "\n", "Viewing the profile of : ", u

    user = User.objects.filter(username=u)
    print "user : ", user
    c = Post.objects.all().filter(user=user).order_by('-pub_date')
    numPost = Post.objects.filter(user=user).count()
    return render(request, 'CodeShareIo/userFeed.html', {'chat': c, 'numPost': numPost})


def basefeed(request):
    if request.method == 'GET':
        template_name = 'CodeShareIo/baseFeed.html'
        a = User.objects.all()
        b = Post.objects.all()
        print "********************************************"
        return render(request, template_name, {'userP': a, 'postP': b})
