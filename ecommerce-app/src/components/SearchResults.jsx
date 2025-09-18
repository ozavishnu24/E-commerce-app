import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from "./products/ProductCard.jsx"; 
import { getProducts } from '../features/products/productsSlice';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get search query from URL
  const query = new URLSearchParams(location.search).get('q') || '';
  
  // Get products from Redux store
  const { products, status } = useSelector(state => state.products);
  
  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    // Fetch all products if not already loaded
    if (status === 'idle') {
      dispatch(getProducts());
    }
  }, [dispatch, status]);
  
  useEffect(() => {
    if (products.length > 0 && query) {
      // Filter products based on search query
      const results = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [products, query]);
  
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.search.value;
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            name="search"
            defaultValue={query}
            placeholder="Search products..."
            className="flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-r-lg hover:bg-primary-dark transition-colors"
          >
            Search
          </button>
        </form>
      </div>
      
      {query && (
        <p className="mb-6 text-gray-600">
          Showing results for: <span className="font-semibold">"{query}"</span>
        </p>
      )}
      
      {status === 'loading' ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">Try a different search term</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Browse All Products
          </button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-gray-600">
            Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;