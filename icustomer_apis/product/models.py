from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Company(models.Model):
    name = models.CharField(max_length=200)
    website = models.URLField(max_length=200)
    address = models.TextField()

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    company = models.ForeignKey(Company, related_name='products', on_delete=models.CASCADE)

    def __str__(self):
        return self.name