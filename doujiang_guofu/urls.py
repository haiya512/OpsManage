from django.conf.urls import url
from . import views

app_name = "doujiang_guofu"
urlpatterns = [
    url(r'^family/$', views.FamilyList.as_view(), name="family_list"),
    # url(r'^inventory/$', views.DeployInventory.as_view(), name="family_edit"),
    # url(r'^inventory/group/(?P<id>[0-9]+)/$', views.DeployInventoryGroups.as_view()),
    # url(r'^scripts/$', views.DeployScripts.as_view()),
    # url(r'^playbook/$', views.DeployPlaybooks.as_view()),
    # url(r'^logs/$', views.DelolyLogs.as_view()),
]
