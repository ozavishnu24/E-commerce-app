import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/cart/cartSlice';
import { addItemToWishlist } from '../../features/wishlist/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };
  
  const handleAddToWishlist = () => {
    dispatch(addItemToWishlist(product));
  };
  
  // Generate star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };
  
  // Calculate discount percentage
  const discountPercentage = Math.round(((product.price - (product.price * 0.8)) / product.price) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-48 object-contain p-4"
          />
        </Link>
        <button
          onClick={handleAddToWishlist}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-primary hover:text-white transition-colors"
        >
          <FaHeart />
        </button>
        {discountPercentage > 0 && (
          <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {discountPercentage}% OFF
          </span>
        )}
      </div>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">{product.title}</h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex">
            {renderRating(product.rating?.rate || 4)}
          </div>
          <span className="text-gray-500 text-sm ml-2">({product.rating?.count || 0})</span>
        </div>
        
        <div className="flex items-center mb-4">
          <span className="text-lg font-bold text-primary">${(product.price * 0.8).toFixed(2)}</span>
          <span className="text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md flex items-center justify-center transition-colors"
        >
          <FaShoppingCart className="mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;