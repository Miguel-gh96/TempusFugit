from django.db import models


class Contact(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True, default='')
    email = models.CharField(max_length=100, blank=True, default='')
    to = models.CharField(max_length=100, blank=True, default='')
    subject = models.CharField(max_length=100, blank=True, default='')
    message = models.CharField(max_length=500, blank=True, default='')

    class Meta:
        ordering = ('created',)
