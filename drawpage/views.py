from django.shortcuts import render
import os
import drawpage.readocel


def drawpage_view(request):
    # Initialize returns
    file_list = []
    object_type_list = []
    object_list = []
    clustering_method = ''

    # If a form got posted
    if request.method == 'POST':
        # If file_select_form
        if 'file_select' in request.POST:
            selected_file = request.POST['file_select']
            # Create object_type_list
            ocel_object_dict_list = drawpage.readocel.get_object_information('media/' + selected_file)
            for i in range(len(ocel_object_dict_list)):
                object_type_list.append(ocel_object_dict_list[i].get('object_type'))
            # Keep clustering_method
            if 'clustering_method_cookie' in request.session:
                print(request.session['clustering_method_cookie'])
                clustering_method = request.session['clustering_method_cookie']
            # Save file_cookie
            request.session['file_cookie'] = selected_file
            file_list.insert(0, request.session['file_cookie'])
        elif 'object_type_select' in request.POST:
            selected_object_type = request.POST['object_type_select']
            
            if 'file_cookie' in request.session:
                # Create object_list
                ocel_object_dict_list = drawpage.readocel.get_object_information('media/' + request.session['file_cookie'])
                for i in ocel_object_dict_list:
                    if i.get('object_type') == selected_object_type:
                        for j in range(len(i.get('attributes'))):
                            object_list.append(i.get('attributes')[j])
                # Keep file_cookie
                file_list.insert(0, request.session['file_cookie'])
           
            # Keep clustering_method
            if 'clustering_method_cookie' in request.session:
                print(request.session['clustering_method_cookie'])
                clustering_method = request.session['clustering_method_cookie']
            # Save object_type_cookie
            request.session['object_type_cookie'] = selected_object_type
            object_type_list.insert(0, request.session['object_type_cookie'])
        elif 'object_select' in request.POST:
            selected_object = request.POST['object_select']

            # Save object_cookie
            request.session['object_cookie'] = selected_object
            object_list.insert(0, request.session['object_cookie'])
            
            if 'clustering_method_select' in request.POST:
                selected_clustering_method = request.POST['clustering_method_select']
                
                print(selected_clustering_method)
                
                # Save clustering_method_cookie
                request.session['clustering_method_cookie'] = selected_clustering_method
                clustering_method = request.session['clustering_method_cookie']

    # Refresh file_list
    ext = ('.csv','.jsonocel')
    for files in os.listdir('media/'):
        if files.endswith(ext):
            file_list.append(files)
        else:
            continue

    # Set Labels of unfilled dropdowns
    if 'file_cookie' in request.session:
        if request.session['file_cookie'] == '':
            print("hello")
            file_list.insert(0, "Select OCEL")
    if 'object_type_cookie' in request.session:
        if request.session['object_type_cookie'] == '':
            print("hello2")
            file_list.insert(0, "Select object Type")
    #if request.session['object_type_cookie'] == "":
    #    object_type_list.insert(0, "Select object type")
    #if request.session['object_cookie'] == "":
    #    object_list.insert(0, "Select object")

    return render(request, 'drawpage/drawpage.html', {'file_list':file_list, 'object_type_list':object_type_list, 'object_list':object_list, 'clustering_method':clustering_method})
