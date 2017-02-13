from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from contact.serializers import ContactSerializer
from django.core.mail import send_mail

@api_view(['POST'])
def sendMessage(request):
    """
    send contact message
    """
    if request.method == 'POST':
        data = request.data
        serializer = ContactSerializer(data=data)
        if serializer.is_valid():
            # Email the profile with the
            # contact information
            subject = data['subject']
            message = 'Works!'

            from_email = settings.EMAIL_HOST_USER
            to_list = ['miguel.gh96@gmail.com']
            #print(from_email, to, subject)
            #mail = EmailMultiAlternatives(subject, html_content, "from_email", [to])
            #mail.attach_alternative(html_content, "text/html")
            #mail.send()
            send_mail(subject, message, from_email, to_list) #fail_silently=True

        return Response({"success": "true"}, status=status.HTTP_201_CREATED)
        # return Response({}, status=status.HTTP_400_BAD_REQUEST)
