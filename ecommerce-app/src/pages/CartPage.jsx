import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { clearCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const CartPage = () => {
  const { items, totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <p className="text-gray-600">
          {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart</p>
          <a
            href="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Cart Items</h2>
                <button
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="space-y-4">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            {/* CartSummary component is already being used here */}
            <CartSummary />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;