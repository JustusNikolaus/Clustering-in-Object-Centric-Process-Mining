from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from os import walk
from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from os import listdir
from os.path import isfile, join

import os
 
# Create your views here.

filenames = next(walk('media/'), (None, None, []))[2]

def importpage_view(request):
    return render(request, "importpage/importpage.html", {})
 
def upload_log(request):
    response_label = []
    file_list = []
    event_logs_path = os.path.join(settings.MEDIA_ROOT, "event_logs")


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
            try:
                if 'log_list' not in request.POST:
                    file = request.POST['file_select']
                    os.remove(file)

                response_label = ['success','Successful delete']
            except:
                response_label = ['danger','Please select a file to delete']
    
    ext = ('.xmlocel','.jsonocel')
    for file in os.listdir('media/'):
        if file.endswith(ext):
            file_list.append(file)

    return render(request, 'importpage/importpage.html', {'response_label':response_label, 'file_list': file_list})
