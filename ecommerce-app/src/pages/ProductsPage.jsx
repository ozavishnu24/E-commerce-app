import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getCategories, getProductsByCategory } from '../features/products/productsSlice';
import ProductList from '../components/products/ProductList';
import Layout from '../components/layout/Layout';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory, status, products, isUsingFallback } = useSelector(state => state.products);
  
  // Use a ref to track if we've already fetched data
  const hasFetched = useRef(false);
  
  useEffect(() => {
    // Only fetch once when component mounts
    if (!hasFetched.current && status === 'idle') {
      hasFetched.current = true;
      dispatch(getCategories());
      dispatch(getProducts());
    }
  }, [dispatch, status]);
  
  // Loading state
  if (status === 'loading') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Error state
  if (status === 'failed') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Failed to load products</h3>
            <p className="text-gray-600">Please try again later</p>
            <button 
              onClick={() => {
                dispatch(getCategories());
                dispatch(getProducts());
              }}
              className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">All Products</h1>
          <p className="text-gray-600">Browse our collection of products</p>
        </div>
        
        {/* Fallback Data Warning */}
        {isUsingFallback && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Using sample data. Unable to connect to the product catalog.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Categories Section */}
        <div className="my-6">
          <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {/* Add "All" category button */}
            <button
              onClick={() => {
                // Prevent multiple calls
                if (status !== 'loading') {
                  dispatch(getProducts());
                }
              }}
              className={`px-4 py-2 rounded-full capitalize ${
                selectedCategory === 'all' || !selectedCategory
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            
            {categories.length > 0 ? (
              categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    // Prevent multiple calls
                    if (status !== 'loading') {
                      dispatch(getProductsByCategory(category === 'all' ? '' : category));
                    }
                  }}
                  className={`px-4 py-2 rounded-full capitalize ${
                    selectedCategory === category 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))
            ) : (
              <p className="text-gray-600">No categories available</p>
            )}
          </div>
        </div>
        
        {/* Products List */}
        <div className="mt-8">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
              
              {/* Debug Information */}
              <div className="mt-6 p-4 bg-gray-100 rounded text-left">
                <p className="font-medium">Debug Information:</p>
                <p>Status: {status}</p>
                <p>Products count: {products.length}</p>
                <p>Is using fallback: {isUsingFallback ? 'Yes' : 'No'}</p>
                <p>Categories: {categories.join(', ')}</p>
              </div>
            </div>
          ) : (
            <ProductList category={selectedCategory} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;