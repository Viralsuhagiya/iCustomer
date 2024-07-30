from django.contrib import admin
from .models import Category, Company, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'address')
    search_fields = ('name', 'website', 'address')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'company')
    list_filter = ('category', 'company')
    search_fields = ('name', 'category__name', 'company__name')