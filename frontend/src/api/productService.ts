import axios from './axiosConfig';
import { Product } from '../types/product';
import { Category } from '../types/category';

export const fetchProducts = async (queryParams: { [key: string]: any } = {}): Promise<Product[]> => {
  const response = await axios.get<Product[]>('products/', { params: queryParams });
  return response.data;
};

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>('categories/');
    return response.data;
  };
  