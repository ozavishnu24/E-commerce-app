import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/Layout';
import WishlistItem from '../components/wishlist/WishlistItem';
import { clearWishlist } from '../features/wishlist/wishlistSlice';
import { useDispatch } from 'react-redux';

const WishlistPage = () => {
  const { items } = useSelector(state => state.wishlist);
  const dispatch = useDispatch();
  
  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      dispatch(clearWishlist());
    }
  };
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Your Wishlist</h1>
        <p className="text-gray-600">
          {items.length} {items.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save items you like to your wishlist</p>
          <a
            href="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Saved Items</h2>
            <button
              onClick={handleClearWishlist}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Clear Wishlist
            </button>
          </div>
          
          <div className="space-y-4">
            {items.map(item => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default WishlistPage;