from django.conf.urls import url
from . import views
# from .views import article_add,upload_image,article_edit,article_index

app_name = "websocket"
urlpatterns = [
    url(r'^ssh/$', views.webssh), 
]
