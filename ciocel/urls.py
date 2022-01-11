"""ciocel URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# Library imports
from django.contrib import admin
from django.urls import path 
from django.conf.urls.static import static
from django.conf import settings

# Local imports
from homepage.views import homepage_view
from importpage.views import ImportpageView
from drawpage.views import DrawpageView, pdf_create_report

urlpatterns = [
    path('', homepage_view, name="home"),
    path('import/', ImportpageView.as_view(), name="import"),
    path('draw/', DrawpageView.as_view(), name="draw"),
    path('pdf/', pdf_create_report , name='pdf'),
    path('admin/', admin.site.urls),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
