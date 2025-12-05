from django.db import models
from django.contrib.auth.models import User

class University(models.Model):
    name = models.CharField(max_length=200, verbose_name="Университет аты")
    logo = models.URLField(blank=True, verbose_name="Логотип URL", default="https://placehold.co/100") 
    image_url = models.URLField(blank=True, verbose_name="Кампус суреті")
    
    city = models.CharField(max_length=100, verbose_name="Қала")
    
    OVERALL_GRADES = [('A+', 'A+'), ('A', 'A'), ('A-', 'A-'), ('B+', 'B+')]
    overall_grade = models.CharField(max_length=5, choices=OVERALL_GRADES, default='A')
    
    # Ескерту: min_tuition емес, tuition болу керек
    tuition = models.CharField(max_length=100, verbose_name="Құны (млн ₸)", default="1.0-2.0 млн ₸")
    min_ent = models.IntegerField(default=50, verbose_name="Орташа ЕНТ")
    
    lat = models.FloatField(verbose_name="Ендік (Lat)")
    lng = models.FloatField(verbose_name="Бойлық (Lng)")
    
    tags = models.CharField(max_length=200, default="IT, Инженерия", verbose_name="Тегтер (үтірмен)")
    chance = models.CharField(max_length=50, default="Высокий", verbose_name="Түсу ықтималдығы")
    
    # Таңдаулылар (Favorites)
    favorites = models.ManyToManyField(User, related_name='favorite_universities', blank=True)

    def get_tags_list(self):
        return self.tags.split(',')

    def __str__(self):
        return self.name

class Review(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(verbose_name="Пікір")
    rating = models.IntegerField(default=5, verbose_name="Баға (1-5)")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.university.name}"