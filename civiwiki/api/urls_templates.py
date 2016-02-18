from django.conf.urls import url
import views_templates as v

urlpatterns = [
    url(r'^createpage', v.create_page, name='add page'),
    url(r'^login$', v.login_view, name='login'),
    url(r'^$', v.home_view, name='home'),
    url(r'', v.does_not_exist, name='404')
]
