from django.conf.urls import url
from . import views
# from .views import article_add,upload_image,article_edit,article_index

app_name = "apps"
urlpatterns = [
    url(r'^config/$', views.Config.as_view()), 
    url(r'^list/$', views.Lists.as_view()), 
    url(r'^manage/$', views.Manage.as_view()), 
]