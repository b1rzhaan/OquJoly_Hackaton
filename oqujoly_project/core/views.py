from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages
from .models import University, Review
from django.contrib.auth.decorators import login_required

@login_required
def toggle_favorite(request, pk):
    uni = get_object_or_404(University, pk=pk)
    if uni.favorites.filter(id=request.user.id).exists():
        uni.favorites.remove(request.user) # Алып тастау
    else:
        uni.favorites.add(request.user)    # Қосу
    return redirect('detail', pk=pk)

@login_required
def profile_view(request):
    # Қолданушы сақтаған барлық университеттер
    favorites = request.user.favorite_universities.all()
    return render(request, 'profile.html', {'favorites': favorites})

# 1. Тіркелу (Регистрация)
def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user) # Тіркелген соң бірден кіргізу
            messages.success(request, "Сәтті тіркелдіңіз!")
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})

# 2. Кіру (Логин) - Yeti анимациясымен жұмыс істейді
def login_view(request):
    if request.method == 'POST':
        # HTML-ден деректерді аламыз
        username = request.POST.get('username')
        passw = request.POST.get('password')
        
        user = authenticate(request, username=username, password=passw)
        
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Логин немесе құпия сөз қате!")
            
    return render(request, 'login.html')

# 3. Шығу (Logout)
def logout_view(request):
    logout(request)
    return redirect('home')

def university_detail(request, pk):
    uni = get_object_or_404(University, pk=pk)
    
    # Егер POST сұраныс келсе (яғни пікір жазылса)
    if request.method == 'POST' and request.user.is_authenticated:
        text = request.POST.get('text')
        rating = request.POST.get('rating')
        
        Review.objects.create(
            university=uni,
            user=request.user,
            text=text,
            rating=rating
        )
        return redirect('detail', pk=pk) # Бетті жаңарту

    # Осы университетке қатысты барлық пікірлерді алу
    reviews = uni.reviews.all().order_by('-created_at')

    context = {
        'uni': uni,
        'reviews': reviews
    }
    return render(request, 'detail.html', context)

def university_detail(request, pk):
    uni = get_object_or_404(University, pk=pk)
    return render(request, 'detail.html', {'uni': uni})

def home(request):
    # Топ 3 университетті шығару (мысалы, рейтингі A+)
    top_universities = University.objects.filter(overall_grade='A+')[:3]
    # Барлық университеттер карта үшін
    all_universities = University.objects.all()
    
    context = {
        'top_universities': top_universities,
        'map_data': list(all_universities.values('name', 'city', 'lat', 'lng', 'overall_grade'))
    }
    return render(request, 'home.html', context)

def university_list(request):
    universities = University.objects.all()
    
    # 1. Іздеу (Search)
    search_query = request.GET.get('q')
    if search_query:
        universities = universities.filter(
            Q(name__icontains=search_query) | 
            Q(city__icontains=search_query) |
            Q(tags__icontains=search_query)
        )

    # 2. Қала бойынша сүзгі
    city_filter = request.GET.get('city')
    if city_filter:
        universities = universities.filter(city=city_filter)

    # 3. Тег бойынша сүзгі (мысалы: IT, Грант)
    tag_filter = request.GET.get('tag')
    if tag_filter:
        universities = universities.filter(tags__icontains=tag_filter)

    context = {
        'universities': universities,
        'cities': University.objects.values_list('city', flat=True).distinct(), # Қалалар тізімі фильтр үшін
    }
    return render(request, 'list.html', context)

def login_view(request):
    if request.method == 'POST':
        # Бұл жерде Django-ның стандартты авторизациясын қосуға болады
        # Қазірше тек визуализация үшін бос қалдырамыз немесе redirect жасаймыз
        return redirect('home')
        
    return render(request, 'login.html')