from django.shortcuts import render

# Create your views here.
def importpage_view(request):
    return render(request, "importpage/importpage.html", {})