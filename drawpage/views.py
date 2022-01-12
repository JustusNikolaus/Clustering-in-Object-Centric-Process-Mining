# Library imports
from django.http.request import HttpRequest
from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from pathlib import Path
import os

# Local imports
from drawpage import main, readocel
from .models import Log

BASE_DIR = Path(__file__).resolve().parent.parent

def clear_log():
     Log.objects.all().delete()

class DrawpageView(TemplateView):
    """View for the Drawpage"""

    template_name = 'drawpage.html'

    def get(self, request, *args, **kwars):
        clear_log()
        return refresh(request,
            file_list = [],
            object_type_list = [],
            attribute_dict = {},
            minactivity = '0',
            minedge = '0',
            clustering_method_check = ['', ''],
            event_assignment_check = ['', ''],
        )

    def post(self, request, *args, **kwargs):
        # Initialize returns
        object_type_list = []
        attribute_dict = {}
        minactivity = '0'
        minedge = '0'
        clustering_method_check = ['', '']
        event_assignment_check = ['', '']

        if 'file_select' in request.POST:
            request = self.file_select(request)
            clear_log()
        elif 'object_type_select' in request.POST:
            request = self.object_type_select(request)
            clear_log()
        elif 'attribute_select' in request.POST:
            request = self.attribute_select(request)
            clear_log()
        elif 'clustering_method_select' in request.POST:
            request.session['clustering_method_cookie'] = request.POST['clustering_method_select']
            clear_log()
        elif 'event_assignment_select' in request.POST:
            request.session['event_assignment_cookie'] = request.POST['event_assignment_select']
            clear_log()
        elif 'cluster' in request.POST: # Cluster Button
            if 'file_cookie' in request.session and 'object_type_cookie' in request.session and 'attributes_cookie' in request.session and 'clustering_method_cookie' in request.session and 'event_assignment_cookie' in request.session:
                path_to_file = 'media/' + request.session['file_cookie']
                object_information = readocel.get_object_types(path_to_file)

                # Delete old Images and Clear Log
                for filename in os.listdir(os.path.join(BASE_DIR, 'media/tmp')):
                    if filename.endswith('.png'):
                        os.remove(os.path.join(BASE_DIR, 'media/tmp/' + filename)) 
                clear_log()

                if 'minactivity_cookie' in request.session and 'minedge_cookie' in request.session:
                    main.main_draw(
                        path_to_file,
                        object_information,
                        request.session['object_type_cookie'],
                        request.session['clustering_method_cookie'],
                        request.session['event_assignment_cookie'],
                        request.session['attributes_cookie'],
                        int(request.session['minactivity_cookie']),
                        int(request.session['minedge_cookie']),
                    )
                else:
                    main.main_draw(
                        path_to_file,
                        object_information,
                        request.session['object_type_cookie'],
                        request.session['clustering_method_cookie'],
                        request.session['event_assignment_cookie'],
                        request.session['attributes_cookie'],
                    )
            else:
                # TODO: Validation
                print("Warning: Clustering failed. Make sure all values are set.")
        elif 'minactivity_select' in request.POST:
            request.session['minactivity_cookie'] = request.POST['minactivity_select']
        elif 'minedge_select' in request.POST:
            request.session['minedge_cookie'] = request.POST['minedge_select']
        elif 'filter' in request.POST: # Filter
            if 'file_cookie' in request.session and 'object_type_cookie' in request.session and 'attributes_cookie' in request.session and 'clustering_method_cookie' in request.session and 'event_assignment_cookie' in request.session and 'minactivity_cookie' in request.session and 'minedge_cookie' in request.session:
                main.draw(request.session['object_type_cookie'], int(request.session['minactivity_cookie']), int(request.session['minedge_cookie']))
            else:
                # TODO: Validation
                print("Warning: Filtering failed. Make sure all values are set.")


        return refresh(request,
            file_list = [],
            object_type_list = object_type_list,
            attribute_dict = attribute_dict,
            minactivity = minactivity,
            minedge = minedge,
            clustering_method_check = clustering_method_check,
            event_assignment_check = event_assignment_check,
        )

    def file_select(self, request):
        request.session['file_cookie'] = request.POST['file_select']

        # Clear old object_type_cookie and attribute_cookie
        if 'object_type_cookie' in request.session:
            del request.session['object_type_cookie']
        if 'attributes_cookie' in request.session:
            del request.session['attributes_cookie']
        return request

    def object_type_select(self, request):
        request.session['object_type_cookie'] = request.POST['object_type_select']

        # Clear old attribute_cookie
        if 'attributes_cookie' in request.session:
            del request.session['attributes_cookie']
        return request

    def attribute_select(self, request):
        request.session['attributes_cookie'] = request.POST.getlist('attribute_select')
        return request

def refresh(request: HttpRequest, file_list: list, object_type_list: list, attribute_dict: dict, minactivity: str, minedge: str, clustering_method_check: list, event_assignment_check: list):
    """Refreshes all attribute values and returns them as a rendered HttpResponse

    Args:
        request (HttpRequest):
        file_list (list): a list of all available OCELs
        object_type_list (list): a list of all available object types for a selected OCEL
        attribute_dict (dict): a dict containing all attributes available for a given OCEL and object type 
        minactivity (str): the minimum activity frequency to display
        minedge (str): the minimum edge frequency to display
        clustering_method_check (list): the selected clustering method. Can be either 'hierarchical' or 'kmeans'
        event_assignment_check (list): the selected method of event assignment. Can either be 'all' or 'existence'

    Returns:
        HttpResponse: a rendered HttpResponse consisting of the inputted HttpRequest and the updated values for the arguments.
    """
    # Refresh file_list
    ext = ('.xmlocel','.jsonocel')
    for files in os.listdir('media/'):
        if files.endswith(ext):
            file_list.append(files)

    if 'file_cookie' in request.session:
        file_list.insert(0, request.session['file_cookie'])

        # Refresh object_type_list
        ocel_object_dict_list = readocel.get_object_types('media/' + request.session['file_cookie'])
        for i in ocel_object_dict_list:
            object_type_list.append(i.get('object_type'))
        if 'object_type_cookie' in request.session:
            object_type_list.insert(0, request.session['object_type_cookie'])

            # Refresh attribute_list
            for i in ocel_object_dict_list:
                if i.get('object_type') == request.session['object_type_cookie']:
                    for j in range(len(i.get('attributes'))):
                        if 'attributes_cookie' in request.session and i.get('attributes')[j] in request.session['attributes_cookie']:
                            attribute_dict[i.get('attributes')[j]] = 'checked'
                        else:
                            attribute_dict[i.get('attributes')[j]] = ''
    # Keep minactivity
    if 'minactivity_cookie' in request.session:
        minactivity = request.session['minactivity_cookie']

    # Keep minedge
    if 'minedge_cookie' in request.session:
        minedge = request.session['minedge_cookie']

    # Keep clustering_method_check
    if 'clustering_method_cookie' in request.session:
        if request.session['clustering_method_cookie'] == "kmeans":
            clustering_method_check = ['checked', '']
        elif request.session['clustering_method_cookie'] == "hierarchical":
            clustering_method_check = ['', 'checked']

    # Keep event_assignment_check
    if 'event_assignment_cookie' in request.session:
        if request.session['event_assignment_cookie'] == "all":
            event_assignment_check = ['checked', '']
        elif request.session['event_assignment_cookie'] == "existence":
            event_assignment_check = ['', 'checked']

    return render(request, 'drawpage.html', {
        'file_list':file_list,
        'object_type_list':object_type_list,
        'attribute_dict':attribute_dict,
        'minactivity':minactivity,
        'minedge':minedge,
        'clustering_method_check':clustering_method_check,
        'event_assignment_check':event_assignment_check,
        'log':Log.objects.all()
    })

def pdf_create_report(request):
    
    template_path = 'pdfreport.html'

    context = {}
    if 'file_cookie' in request.session:
        context['file_name'] = request.session['file_cookie']
    if 'object_type_cookie' in request.session:
        context['object_type'] = request.session['object_type_cookie']
    if 'attributes_cookie' in request.session:
        context['attributes'] = request.session['attributes_cookie']
    if 'minactivity_cookie' in request.session:
        context['minactivity'] = request.session['minactivity_cookie']
    else:
        context['minactivity'] = "0"
    if 'minedge_cookie' in request.session:
        context['minedge'] = request.session['minedge_cookie']
    else:
        context['minedge'] = "0"
    if 'clustering_method_cookie' in request.session:
        context['clustering_method'] = request.session['clustering_method_cookie']
    if 'event_assignment_cookie' in request.session:
        context['event_assignment'] = request.session['event_assignment_cookie']
    context['log'] = Log.objects.all()

    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="report.pdf"'
    # find the template and render it.
    template = get_template(template_path)
    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(html, dest=response)
    # if error then show some funy view
    if pisa_status.err:
        return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response
