import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import PrivateRoute from './components/Auth/PrivateRoute';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import ProductDetail from './components/Product/ProductDetail';
import Register from './components/Auth/Register';

const App: React.FC = () => {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/products" element={<PrivateRoute component={ProductsPage} />} />
        <Route path="/products/:id" element={<PrivateRoute component={ProductDetail} />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
};

export default App;
