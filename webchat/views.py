from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import copy
from .rangename import range_name
# Create your views here.

GLOBAL_MSG_QUEUES = {
    'have': 0
}


@csrf_exempt
def index(request):
    return render(request, 'index.html')


@csrf_exempt
def get_msg(request):
    if request.method == 'POST':
        msg = request.POST['msg']
        if msg == 'quit':
            del request.COOKIES['id']
        if msg:
            GLOBAL_MSG_QUEUES['have'] += 1
            GLOBAL_MSG_QUEUES['rmsg'] = msg
            GLOBAL_MSG_QUEUES['from'] = range_name()
            print(GLOBAL_MSG_QUEUES)
            return HttpResponse('1')
    else:
        tmp = copy.copy(GLOBAL_MSG_QUEUES)
        GLOBAL_MSG_QUEUES.clear()
        GLOBAL_MSG_QUEUES['have'] = 0
        return JsonResponse(tmp)
