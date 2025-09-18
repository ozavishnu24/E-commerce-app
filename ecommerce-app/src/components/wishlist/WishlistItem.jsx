import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeItemFromWishlist } from '../../features/wishlist/wishlistSlice';
import { addItemToCart } from '../../features/cart/cartSlice';

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleRemoveFromWishlist = () => {
    dispatch(removeItemFromWishlist(item.id));
  };
  
  const handleAddToCart = () => {
    dispatch(addItemToCart(item));
  };
  
  return (
    <div className="flex flex-col md:flex-row items-center border-b border-gray-200 py-4">
      <div className="w-full md:w-1/4 mb-4 md:mb-0">
        <Link to={`/product/${item.id}`}>
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-24 h-24 object-contain mx-auto"
          />
        </Link>
      </div>
      
      <div className="w-full md:w-2/4 px-4">
        <Link to={`/product/${item.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">{item.title}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{item.category}</p>
        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="w-full md:w-1/4 flex justify-center space-x-4 mt-4 md:mt-0">
        <button 
          onClick={handleAddToCart}
          className="bg-primary hover:bg-primary-dark text-white p-3 rounded-full transition-colors"
        >
          <FaShoppingCart />
        </button>
        
        <button 
          onClick={handleRemoveFromWishlist}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;