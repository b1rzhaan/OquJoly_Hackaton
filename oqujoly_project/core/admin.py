from django.contrib import admin
from .models import University, Review

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    # min_tuition ЕМЕС, tuition болуы керек
    list_display = ('name', 'city', 'overall_grade', 'tuition', 'chance')
    list_filter = ('city', 'overall_grade')
    search_fields = ('name', 'city')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'university', 'rating', 'created_at')