# Library imports
from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from drawpage.readocel import validate_ocel_jsonocel
import os


# Create your views here. 
class ImportpageView(TemplateView):

    template_name = 'importpage.html'

    def get(self, request):
        return refresh(request, upload_response_label = [], delete_response_label = [])

    def post(self, request):
        upload_response_label = []
        delete_response_label = []

        if 'upload_log' in request.FILES:
            uploaded_file = request.FILES['upload_log']
            fs = FileSystemStorage()

            if uploaded_file.name.endswith('.jsonocel'):
                fs.save(uploaded_file.name, uploaded_file)
                upload_response_label = ['success','File upload successful','check-circle-fill']

                if not validate_ocel_jsonocel(os.path.join(settings.MEDIA_ROOT, uploaded_file.name)):
                    os.remove(os.path.join(settings.MEDIA_ROOT, uploaded_file.name))
                    upload_response_label = ['danger','File validation failed. Make sure file contains a valid OCEL','exclamation-triangle-fill'] 
            else:
                upload_response_label = ['danger','File format must be .jsonocel','exclamation-triangle-fill']
        elif 'delete_log' in request.POST:
            try:
                file = request.POST['delete_log']
                os.remove(os.path.join(settings.MEDIA_ROOT, file))

                delete_response_label = ['success','Successfully deleted','trash-fill']
            except:
                delete_response_label = ['danger','File deletion failed','exclamation-triangle-fill']

        return refresh(request, upload_response_label=upload_response_label, delete_response_label=delete_response_label)
        
def refresh(request, **kwargs):
    ext = ('.xmlocel','.jsonocel')
    file_list = [file for file in os.listdir('media/') if file.endswith(ext)]

    kwargs_dict = {'file_list': file_list}
    kwargs_dict.update(kwargs)

    return render(request, 'importpage.html', kwargs_dict)

