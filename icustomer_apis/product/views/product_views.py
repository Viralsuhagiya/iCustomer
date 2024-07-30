from rest_framework import generics, status
from ..models import Product
from django_filters.rest_framework import DjangoFilterBackend
from ..serializers import ProductDetailSerializer, ProductListSerializer
from rest_framework.filters import SearchFilter
from rest_framework.response import Response

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category_id']
    search_fields = ['name', 'price'] 

    def get_queryset(self):
        queryset = super().get_queryset()
        category_id = self.request.query_params.get('category_id', None)
        search = self.request.query_params.get('search', None)
        
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        
        if search:
            queryset = queryset.filter(name__icontains=search) | queryset.filter(price__icontains=search)
        
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response({
                'total_records': queryset.count(),
                'results': serializer.data
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'total_records': queryset.count(),
            'results': serializer.data
        }, status=status.HTTP_200_OK)



class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
