from django.conf.urls import url
from . import views
from django.contrib.auth.views import logout as logout
from views import ProfileView
app_name = 'CodeShareIo'
urlpatterns = [
    #/CodeShareIo
    url(r'^$', views.IndexView.as_view(), name='index'),
    #/CodeShareIo/Application
    url(r'^Application/$', views.MobileApplicationView.as_view(), name='mobile'),
    #/CodeShareIo/Login
    url(r'^Login/$', views.LoginView.as_view(), name='login'),
    # /CodeShareIo/Application
    url(r'^ResetPassword/$', views.ResetPasswordView.as_view(), name='resetPassword'),
    # /CodeShareIo/Register
    url(r'^Register/$', views.UserFormView.as_view(), name='register'),
    # /CodeShareIo/Feed
    url(r'!/$', views.FeedView.as_view(), name='feed'),
    # /CodeShare/Logout
    url(r'^Logout/$', logout, {'next_page': '/CodeShareIo/Login'}, name='logout'),
    # /CodeShare/Username
    url(r'^!/(?P<slug>[\w.@+-]+)', views.ProfileView.as_view(), name='profile'),
    # /CodeShare/PostChat
    url(r'^PostChat/$', views.PostChat, name='postChat'),
    # /CodeShareIo/MessagesChat
    url(r'^MessagesChat/$', views.MessagesChat, name='messagesChat'),
    # /CodeShareIo/MessagesChat
    url(r'^FeedChat/$', views.FeedConnectedUser, name='feedChat'),
]
