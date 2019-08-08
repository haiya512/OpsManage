"""Sparrow URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from OpsManage.views import index, users

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', index.Index.as_view(), name="index"),
    url(r'^login/$', index.login),
    url(r'^logout/$', index.logout),
    url(r'^403/$', index.Permission.as_view()),
    url(r'^404/$', index.PageError.as_view()),
    url(r'^user/manage/$', users.UserManage.as_view(), name="user_manage"),
    url(r'^user/center/$', users.UserCenter.as_view(), name="user_center"),
    url(r'^group/manage/$', users.GroupManage.as_view(), name="group_manage"),
    url(r'^api/', include('api.urls', namespace="api")),
    url(r'^assets/', include('asset.urls', namespace="assets")),
    url(r'^deploy/', include('deploy.urls', namespace="deploy")),
    url(r'^db/', include('databases.urls', namespace="db")),
    url(r'^sched/', include('sched.urls', namespace="sched")),
    url(r'^apps/', include('cicd.urls', namespace="apps")),
    url(r'^nav/', include('navbar.urls', namespace="nav")),
    url(r'^websocket/', include('websocket.urls', namespace="websocket")),
    url(r'^wiki/', include('wiki.urls', namespace="wiki")),
    url(r'^order/', include('orders.urls', namespace="order")),
    url(r'^apply/', include('apply.urls', namespace="apply")),
    # 斗将国服
    url(r"^djgf/", include("doujiang_guofu.urls", namespace="doujiang_guofu")),
]
