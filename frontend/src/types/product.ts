import { Category } from './category';
import { Company } from './company';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  company: Company;
}