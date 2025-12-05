from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('universities/', views.university_list, name='list'),
    path('login/', views.login_view, name='login'),
    path('university/<int:pk>/', views.university_detail, name='detail'),
    # Авторизация
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'), # Жаңа
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.profile_view, name='profile'),             # Профиль
    path('favorite/<int:pk>/', views.toggle_favorite, name='favorite'),
]