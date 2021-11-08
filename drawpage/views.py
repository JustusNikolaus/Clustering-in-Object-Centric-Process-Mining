from django.http.response import HttpResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import os

# Create your views here.
def drawpage_view(request):
    log_list = []
    ext = ('.csv','.jsonocel')
    for files in os.listdir("media/"):
        if files.endswith(ext):
            log_list.append(files)
            print(log_list)
        else:
            continue
    return render(request,'drawpage/drawpage.html', {'log_list':log_list})
