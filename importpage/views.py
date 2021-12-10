from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from os import walk

import os
 
# Create your views here.

filenames = next(walk('media/'), (None, None, []))[2]

def importpage_view(request):
    return render(request, "importpage/importpage.html", {})
 
def upload_log(request):
    response_label = []
    file_list = []


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
                
        #TODO: delete function
        # elif 'delete_log' in request.POST:
        #     try:
        #         print("test")
        #         os.remove(request.POST['file'])
        #     except: 
        #         response_label = ['danger','Please select a file to delete']
    
    ext = ('.xmlocel','.jsonocel')
    for files in os.listdir('media/'):
        if files.endswith(ext):
            file_list.append(files)

    return render(request, 'importpage/importpage.html', {'response_label':response_label, 'file_list': file_list})
