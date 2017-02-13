from django.conf.urls import url
from contact import views

urlpatterns = [
    url(r'^api/v1/contact/$', views.sendMessage),
]
