import React from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, updateItemQuantity } from '../../features/cart/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleRemoveItem = () => {
    dispatch(removeItemFromCart(item.id));
  };
  
  const handleIncrementQuantity = () => {
    dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };
  
  const handleDecrementQuantity = () => {
    if (item.quantity > 1) {
      dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row items-center border-b border-gray-200 py-4">
      <div className="w-full md:w-1/4 mb-4 md:mb-0">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-24 h-24 object-contain mx-auto"
        />
      </div>
      
      <div className="w-full md:w-2/4 px-4">
        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{item.category}</p>
        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="w-full md:w-1/4 flex flex-col md:flex-row items-center justify-between mt-4 md:mt-0">
        <div className="flex items-center border rounded-md mb-4 md:mb-0">
          <button 
            onClick={handleDecrementQuantity}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            <FaMinus size={12} />
          </button>
          <span className="px-4 py-1">{item.quantity}</span>
          <button 
            onClick={handleIncrementQuantity}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            <FaPlus size={12} />
          </button>
        </div>
        
        <div className="flex items-center">
          <span className="font-bold mr-4">${(item.price * item.quantity).toFixed(2)}</span>
          <button 
            onClick={handleRemoveItem}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;