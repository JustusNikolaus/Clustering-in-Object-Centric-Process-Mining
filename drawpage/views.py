# Library imports
from django.shortcuts import render
import os

# Local imports
from drawpage import main, readocel


def drawpage_view(request):
    # Initialize returns
    file_list = []
    object_type_list = []
    object_list = []
    clustering_method = ['', '']
    dfg_file_path_list = []

    # If a form got posted
    if request.method == 'POST':
        # If file_select_form
        if 'file_select' in request.POST:
            selected_file = request.POST['file_select']
            # Create object_type_list
            ocel_object_dict_list = readocel.get_object_types('media/' + selected_file)
            #print(ocel_object_dict_list)
            for i in range(len(ocel_object_dict_list)):
                object_type_list.append(ocel_object_dict_list[i].get('object_type'))
            # Clear old object_type_cookie and object_cookie
            if 'object_type_cookie' in request.session:
                del request.session['object_type_cookie']
            if 'object_cookie' in request.session:
                del request.session['object_cookie']
            # Keep clustering_method
            if 'clustering_method_cookie' in request.session:
                if request.session['clustering_method_cookie'] == "kmeans":
                    clustering_method = ['checked', '']
                elif request.session['clustering_method_cookie'] == "hierarchical":
                    clustering_method = ['', 'checked']

            # Save file_cookie and write to top of file_list
            request.session['file_cookie'] = selected_file
            file_list.insert(0, request.session['file_cookie'])
        # If object_type_select_form
        elif 'object_type_select' in request.POST:
            selected_object_type = request.POST['object_type_select']

            if 'file_cookie' in request.session:
                # Create object_list and object_type_list
                ocel_object_dict_list = readocel.get_object_types('media/' + request.session['file_cookie'])
                for i in ocel_object_dict_list:
                    object_type_list.append(i.get('object_type'))
                    #print(i.get('object_type'))
                    if i.get('object_type') == selected_object_type:
                        for j in range(len(i.get('attributes'))):
                            object_list.append(i.get('attributes')[j])
                # Clear old object_cookies
                if 'object_cookie' in request.session:
                    del request.session['object_cookie']
                # Keep clustering_method
                if 'clustering_method_cookie' in request.session:
                    if request.session['clustering_method_cookie'] == "kmeans":
                        clustering_method = ['checked', '']
                    elif request.session['clustering_method_cookie'] == "hierarchical":
                        clustering_method = ['', 'checked']

                # Keep selected file in top of file_list
                file_list.insert(0, request.session['file_cookie'])

            # Save object_type_cookie
            request.session['object_type_cookie'] = selected_object_type
            object_type_list.insert(0, request.session['object_type_cookie'])
        # If object_select_form
        elif 'object_select' in request.POST:
            selected_object = request.POST['object_select']

            path_to_file = 'media/' + request.session['file_cookie']
            #main.main_draw(path_to_file, )

            # Create object_list and object_type_list
            if 'object_type_cookie' in request.session and 'file_cookie' in request.session:
                ocel_object_dict_list = readocel.get_object_types('media/' + request.session['file_cookie'])
                for i in ocel_object_dict_list:
                    object_type_list.append(i.get('object_type'))
                    if i.get('object_type') == request.session['object_type_cookie']:
                        for j in range(len(i.get('attributes'))):
                            object_list.append(i.get('attributes')[j])

            # Save object_cookie
            request.session['object_cookie'] = selected_object
            object_list.insert(0, request.session['object_cookie'])

            if 'clustering_method_select' in request.POST:
                selected_clustering_method = request.POST['clustering_method_select']

                if selected_clustering_method == "kmeans":
                    clustering_method = ['checked', '']
                elif selected_clustering_method == "hierarchical":
                    clustering_method = ['', 'checked']
                
                # Save clustering_method_cookie
                request.session['clustering_method_cookie'] = selected_clustering_method
            
            # Call main_draw
            if 'file_cookie' in request.session and 'object_type_cookie' in request.session and 'clustering_method_cookie' in request.session:
                path_to_file = 'media/' + request.session['file_cookie']
                print("Path to file is: {}".format(path_to_file))
                object_information = readocel.get_object_types(path_to_file)
                print("Object information is: {}".format(object_information))
                dfg_file_path_list = main.main_draw(path_to_file, object_information, request.session['object_type_cookie'], request.session['clustering_method_cookie'])

    # Refresh file_list
    ext = ('.csv','.jsonocel')
    for files in os.listdir('media/'):
        if files.endswith(ext):
            file_list.append(files)
        else:
            continue

    # For Debugging: print all cookies
    if 'file_cookie' in request.session:
                print("----->File: " + request.session['file_cookie'])
    if 'object_type_cookie' in request.session:
                print("----->Object Type: " + request.session['object_type_cookie'])
    if 'object_cookie' in request.session:
                print("----->Object: " + request.session['object_cookie'])
    if 'clustering_method_cookie' in request.session:
                print("----->Clustering Method: " + request.session['clustering_method_cookie'])

    return render(request, 'drawpage/drawpage.html', {'file_list':file_list, 'object_type_list':object_type_list, 'object_list':object_list, 'clustering_method':clustering_method, 'dfg_file_path_list':dfg_file_path_list})
