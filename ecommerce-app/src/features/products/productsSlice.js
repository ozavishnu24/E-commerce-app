import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductsByCategory, fetchCategories } from '../../services/api'; 
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const products = await fetchProducts();
    return products;
  }
);

export const getProductsByCategory = createAsyncThunk(
  'products/getProductsByCategory',
  async (category) => {
    const products = await fetchProductsByCategory(category);
    return products;
  }
);

export const getCategories = createAsyncThunk(
  'products/getCategories',
  async () => {
    const categories = await fetchCategories();
    return categories;
  }
);

const initialState = {
  products: [],
  categories: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  categoriesStatus: 'idle',
  error: null,
  selectedCategory: 'all',
  isUsingFallback: false, // Track if we're using fallback data
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Products
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
        state.isUsingFallback = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        // Check if we're using fallback data
        state.isUsingFallback = action.payload.length > 0 && 
          action.payload[0].id === 1 && 
          action.payload[0].title.includes("Fjallraven");
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Products by category
      .addCase(getProductsByCategory.pending, (state) => {
        state.status = 'loading';
        state.isUsingFallback = false;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        // Check if we're using fallback data
        state.isUsingFallback = action.payload.length > 0 && 
          action.payload[0].id === 1 && 
          action.payload[0].title.includes("Fjallraven");
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Categories
      .addCase(getCategories.pending, (state) => {
        state.categoriesStatus = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categoriesStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory } = productsSlice.actions;
export default productsSlice.reducer;