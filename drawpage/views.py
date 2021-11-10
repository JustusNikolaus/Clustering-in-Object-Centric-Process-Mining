from django.shortcuts import render
import os
import drawpage.readocel


# Create your views here.
def drawpage_view(request):
    # initialize return lists
    log_list = []
    object_type_list = []

    # File Select
    if request.method == 'POST':
        selected_file = request.POST['file_select']

        ocel_object_dict_list = drawpage.readocel.get_object_information('media/' + selected_file)

        for i in range(len(ocel_object_dict_list)):
            object_type_list.append(ocel_object_dict_list[i].get('object_type'))
        
        request.session['filecookie'] = selected_file
        
        log_list.insert(0, request.session['filecookie'])
    else:
        log_list.insert(0, "Select OCEL")

    ext = ('.csv','.jsonocel')
    for files in os.listdir('media/'):
        if files.endswith(ext):
            log_list.append(files)
        else:
            continue
    return render(request, 'drawpage/drawpage.html', {'log_list':log_list, 'object_type_list':object_type_list})
