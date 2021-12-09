from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import os

# Create your views here.
def upload_log(request):
    response_label = []
    log_list = []
    if request.method == 'POST':
        if 'upload_log' in request.FILES:
            try:
                uploaded_file = request.FILES['upload_log']
                fs = FileSystemStorage()

                if uploaded_file.name.endswith('.jsonocel'):
                    fs.save(uploaded_file.name, uploaded_file)
                    response_label = ['success','File upload successful']
                else:
                    response_label = ['danger','File format must be .jsonocel']
            except:
                response_label = ['danger','Please select a file first']
        elif 'delete_log' in request.POST:
            # TODO: create a list of all filenames and name it 'file_list'
            print()
    return render(request, 'importpage/importpage.html', {'response_label':response_label, 'log_list':log_list})


