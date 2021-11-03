from django.shortcuts import render

# Create your views here.
def drawpage_view(request):
    return render(request, "drawpage/drawpage.html", {})