// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './pages/Dashboard';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage'; 
import AboutPage from './pages/AboutPage'; 
import DealsPage from './pages/DealsPage'; 
import SearchResults from './components/SearchResults.jsx'; 
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} /> 
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/search" element={<SearchResults />} /> 
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;