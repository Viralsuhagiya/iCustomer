import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Box, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert, SelectChangeEvent, Grid, IconButton, Typography } from '@mui/material';
import { fetchProducts, fetchCategories } from '../../api/productService';
import { Product } from '../../types/product';
import { Category } from '../../types/category';
import debounce from 'lodash.debounce';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { Link } from 'react-router-dom'; // Add this import

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [view, setView] = useState<'list' | 'kanban'>('list');

  const loadProducts = async (searchTerm: string, categoryFilter: string) => {
    setLoading(true);
    try {
      const queryParams: { [key: string]: any } = { search: searchTerm };
      if (categoryFilter) {
        queryParams.category_id = categoryFilter;
      }
      const products:any = await fetchProducts(queryParams);
      setProducts(products.results);
      setTotalProducts(products.total_records)
    } catch (err:any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const categories = await fetchCategories();
      setCategories(categories);
    } catch (err) {
      setError('Failed to load categories. Please try again later.');
    }
  };

  const debouncedLoadProducts = useCallback(debounce(loadProducts, 500), []);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    debouncedLoadProducts(search, category);
  }, [search, category, debouncedLoadProducts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setCategory(e.target.value as string);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, renderCell: (params) => (
      <Link to={`/products/${params.row.id}`}>{params.value}</Link>
    ) },    
    { field: 'price', headerName: 'Price', flex: 1 },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      valueGetter: (params:Category) => params.name,
    }
  ];
  
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

  return (
    <Container>
      <Grid container sx={{ flex: 1, pt: 5 , gap:2}}>
        <TextField
          label="Search"  
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
        />
        <FormControl variant="outlined">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton onClick={() => setView('list')}>
          <ViewListIcon />
        </IconButton>
        <IconButton onClick={() => setView('kanban')}>
          <ViewKanbanIcon />
        </IconButton>
      </Grid>
      <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6">Total Products: {totalProducts}</Typography>
    </Box>
      {view === 'list' ? (
        <Grid container sx={{ height: 400, width: '100%', pt: 2 }}>
          <DataGrid
            rows={products}
            columns={columns}
            sortingOrder={['asc', 'desc']}
          />
        </Grid>
      ) : (
        <Grid container spacing={2} sx={{ pt: 2 }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
              <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
              <p>Price: ${product.price}</p>
                <p>Category: {product.category.name}</p>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductList;