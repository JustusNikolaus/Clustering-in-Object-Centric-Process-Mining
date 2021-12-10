# Library imports
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os

# Create your views here. 
def importpage_view(request):
    upload_response_label = []
    delete_response_label = []
    file_list = []

    if request.method == 'POST':
        if 'upload_log' in request.FILES:
            try:
                uploaded_file = request.FILES['upload_log']
                fs = FileSystemStorage()

                if uploaded_file.name.endswith('.jsonocel'):
                    fs.save(uploaded_file.name, uploaded_file)
                    upload_response_label = ['success','File upload successful']
                else:
                    upload_response_label = ['danger','File format must be .jsonocel']
            except:
                upload_response_label = ['danger','Please select a file first']
        elif 'delete_log' in request.POST:
            try:
                file = request.POST['delete_log']
                os.remove(os.path.join(settings.MEDIA_ROOT, file))

                delete_response_label = ['success','Successfully deleted']
            except:
                delete_response_label = ['danger','Please select a file to delete']

    ext = ('.xmlocel','.jsonocel')
    for file in os.listdir('media/'):
        if file.endswith(ext):
            file_list.append(file)

    return render(request, 'importpage/importpage.html', {'upload_response_label':upload_response_label, 'delete_response_label':delete_response_label, 'file_list': file_list})
