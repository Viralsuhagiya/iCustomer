import React from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to iCustomer Products 
      </Typography> 
      <Typography variant="body2">
            Go to <Link to="/products">Products</Link>
          </Typography>
    </Container>
  );
};

export default HomePage;
