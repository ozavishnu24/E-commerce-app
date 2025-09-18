import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getProductsByCategory, setCategory } from '../../features/products/productsSlice';
import ProductCard from './ProductCard';

const ProductList = ({ category }) => {
  const dispatch = useDispatch();
  const { products, status, selectedCategory, isUsingFallback } = useSelector(state => state.products);
  
  useEffect(() => {
    if (category !== selectedCategory) {
      dispatch(setCategory(category));
    }
    
    if (category === 'all') {
      dispatch(getProducts());
    } else {
      dispatch(getProductsByCategory(category));
    }
  }, [category, dispatch, selectedCategory]);
  
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (status === 'failed') {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-red-500 mb-2">Failed to load products</h3>
        <p className="text-gray-600 mb-4">Please try again later</p>
        <button 
          onClick={() => {
            if (category === 'all') {
              dispatch(getProducts());
            } else {
              dispatch(getProductsByCategory(category));
            }
          }}
          className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-gray-600 mb-4">Try a different category</p>
        <button 
          onClick={() => dispatch(getProducts())}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          View All Products
        </button>
      </div>
    );
  }
  
  return (
    <div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;