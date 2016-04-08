from functools import wraps
from django.utils.decorators import available_attrs
from django.http import HttpResponseBadRequest
'''
USAGE:
    @require_post_params(params=['we', 'are', 'required'])

    returns a bad request if all required parameters are not present in the POST
'''
def require_post_params(params):
    def decorator(func):
        @wraps(func, assigned=available_attrs(func))
        def inner(request, *args, **kwargs):
            if not all(param in request.POST for param in params):
                missing_params = [p for p in params if p not in request.POST].join(" ")
                reason = "Missing required parameter(s): {p}".format(p=missing_params)
                return HttpResponseBadRequest(reason=reason)
            return func(request, *args, **kwargs)
        return inner
    return decorator
