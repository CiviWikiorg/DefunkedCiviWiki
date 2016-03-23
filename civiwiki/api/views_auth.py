from django.contrib.auth.models import User
from django.db import IntegrityError
from models import Account
from django.http import JsonResponse, HttpResponse, HttpResponseServerError, HttpResponseRedirect, HttpResponseBadRequest
from django.shortcuts import redirect
from django.contrib.auth import authenticate, logout, login
from utils.custom_decorators import require_post_params

@require_post_params(params=['username', 'password'])
def cw_login(request):
	'''
	USAGE:

	'''	
	username = request.POST.get('username', '')
	password = request.POST.get('password', '')
	remember = request.POST.get('remember', 'false')

	user = authenticate(username=username, password=password)
	if user is not None:
		if user.is_active:
			if remember == 'false':
				request.session.set_expiry(0)

			u = login(request, user)

			# Redirect to a success page.
			return HttpResponse()
		else:
			# Return a 'disabled account' error message
			return HttpResponseServerError(reason='inactive account')
	else:
	# Return an 'invalid login' error message.
		return HttpResponseBadRequest(reason='invalid username / password combination')

def cw_logout(request):
	logout(request)
	return HttpResponseRedirect('/')

@require_post_params(params=['username', 'password', 'email', 'first_name', 'last_name'])
def cw_register(request):
	username = request.POST.get('username', '')
	password = request.POST.get('password', '')
	email = request.POST.get('email', '')
	first_name = request.POST.get('first_name', '')
	last_name = request.POST.get('last_name', '')
	if User.objects.filter(email=email).exists():
		return HttpResponseBadRequest(reason='An account exists for this email address.')

	if User.objects.filter(username=username).exists():
		return HttpResponseBadRequest(reason='Sorry, this username is taken.')

	try:
		User.objects.create_user(username, email, password)
		user = authenticate(username=username, password=password)
		user.is_active = False
		user.save()
	except Exception as e:
		return HttpResponseServerError(reason=str(e))

	try:
		account = Account(user=user, email=email, first_name=first_name, last_name=last_name)
		account.save()
		login(request, user)
		return HttpResponse()
	except Exception as e:
		user.delete()
		return HttpResponseServerError(reason=str(e))
