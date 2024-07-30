import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Box, Typography, Button, Link, CircularProgress, Alert } from '@mui/material';
import axios from '../../api/axiosConfig';
import { Product } from '../../types/product';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/products');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`/products/${id}`);
        setProduct(response.data);
      } catch (err: any) {
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return null;
  }

  return (
<Container sx={{ pt: 2 }}>     
     <Button variant="contained" onClick={handleBack} sx={{ mb: 2 }}>
        Go Back
      </Button>
        <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography variant="body1">Price: ${product.price}</Typography>
          <Typography variant="body1">Category: {product.category.name}</Typography>
          <Typography variant="body1">Company: {product.company.name}</Typography>
          <Typography variant="body1">
            Website:{' '}
            <Link href={product.company.website} target="_blank" rel="noopener noreferrer">
              {product.company.website}
            </Link>
          </Typography>
        </Box>
      </Container>
  );
};

export default ProductDetail;
