from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import os

# Create your views here.
def importpage_view(request):
    return render(request, "importpage/importpage.html", {})

def upload_log(request):
    response_label = []
    if request.method == 'POST':
        try:
            uploaded_file = request.FILES['log']
            fs = FileSystemStorage()

            if uploaded_file.name.endswith('.jsonocel'):
                fs.save(uploaded_file.name, uploaded_file)
                response_label = ['success','File upload successful']
            else:
                response_label = ['danger','File format must be .jsonocel']
        except:
            response_label = ['danger','Please select a file first']
    return render(request, 'importpage/importpage.html', {'response_label':response_label})


