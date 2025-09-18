import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartSummary = ({ isCheckoutPage = false }) => {
  const { items, totalAmount, totalQuantity } = useSelector(state => state.cart);
  
  const shippingCost = totalAmount > 50 ? 0 : 5.99;
  const tax = totalAmount * 0.08;
  const orderTotal = totalAmount + shippingCost + tax;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalQuantity} items)</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Only show buttons if not on checkout page */}
      {!isCheckoutPage && (
        <div className="space-y-3">
          <Link
            to="/checkout"
            className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-md transition-colors"
          >
            Proceed to Checkout
          </Link>
          
          <Link
            to="/"
            className="block w-full border border-primary text-primary text-center py-3 rounded-md hover:bg-primary hover:text-white transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      )}
      
      {shippingCost > 0 && (
        <div className="mt-6 p-3 bg-green-50 rounded-md text-green-700 text-sm">
          Add ${(50 - totalAmount).toFixed(2)} more to your cart to qualify for free shipping!
        </div>
      )}
    </div>
  );
};

export default CartSummary;