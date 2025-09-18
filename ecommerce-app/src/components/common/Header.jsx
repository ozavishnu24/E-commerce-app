import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const cartItems = useSelector(state => state.cart.items);
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalWishlistItems = wishlistItems.length;
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-dark">ShopEase</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-dark hover:text-primary transition-colors">Home</Link>
            <Link to="/deals" className="text-dark hover:text-primary transition-colors">Deals</Link>
            <Link to="/about" className="text-dark hover:text-primary transition-colors">About</Link>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="border rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowSearch(false)}
                    className="ml-2 text-gray-500 hover:text-primary"
                  >
                    <FaTimes />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-gray-600 hover:text-primary"
                >
                  <FaSearch />
                </button>
              )}
            </div>
            
            {/* Cart */}
            <Link to="/cart" className="relative text-gray-600 hover:text-primary">
              <FaShoppingCart className="text-xl" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>
            
            {/* Wishlist */}
            <Link to="/wishlist" className="relative text-gray-600 hover:text-primary">
              <FaHeart className="text-xl" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalWishlistItems}
                </span>
              )}
            </Link>
            
            {/* Notifications */}
            <button className="text-gray-600 hover:text-primary">
              <FaBell className="text-xl" />
            </button>
            
            {/* User */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                  <FaUser className="text-xl" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-primary">
                <FaUser className="text-xl" />
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <Link to="/" className="block py-2 text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/deals" className="block py-2 text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>Deals</Link>
            <Link to="/about" className="block py-2 text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>About</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;