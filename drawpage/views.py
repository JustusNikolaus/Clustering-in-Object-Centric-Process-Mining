from django.http.response import HttpResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import os
import drawpage.readocel

# Create your views here.
def drawpage_view(request):
    # Standard Handler
    log_list = []
    ext = ('.csv','.jsonocel')
    for files in os.listdir("media/"):
        if files.endswith(ext):
            log_list.append(files)
        else:
            continue
    return render(request,'drawpage/drawpage.html', {'log_list':log_list})

def fileselect_view(request):
    # File Select Handler
    object_type_list = []
    if request.method == 'POST':
        selected_file = request.POST['file_select']
        ocel_object_dict_list = drawpage.readocel.get_object_information('media/' + selected_file)
        for i in range(len(ocel_object_dict_list)):
            object_type_list.append(ocel_object_dict_list[i].get('object_type'))
    return render(request,'drawpage/drawpage.html', {'object_type_list':object_type_list})
