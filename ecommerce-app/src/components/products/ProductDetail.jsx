import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../services/api';
import { addItemToCart } from '../../features/cart/cartSlice';
import { addItemToWishlist } from '../../features/wishlist/wishlistSlice';
import { FaHeart, FaShoppingCart, FaStar, FaRegStar, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      dispatch(addItemToCart({ ...product, quantity }));
    }
  };
  
  const handleAddToWishlist = () => {
    if (product) {
      dispatch(addItemToWishlist(product));
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">Product not found</h3>
        <p className="text-gray-600">The product you're looking for doesn't exist</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-96 object-contain"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4 capitalize">{product.category}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex">
              {renderRating(product.rating?.rate || 4)}
            </div>
            <span className="text-gray-500 ml-2">({product.rating?.count || 0} reviews)</span>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold text-primary">${(product.price * 0.8).toFixed(2)}</span>
              <span className="text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
              <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold ml-2">
                20% OFF
              </span>
            </div>
            <p className="text-green-600 font-medium">In Stock</p>
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button 
                onClick={decrementQuantity}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                onClick={incrementQuantity}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-md flex items-center justify-center transition-colors"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              <FaHeart className="text-gray-600" />
            </button>
          </div>
          
          {/* Product Features */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-lg mb-4">Product Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaTruck className="text-primary mr-2" />
                <span>Free delivery on orders over $50</span>
              </li>
              <li className="flex items-center">
                <FaShieldAlt className="text-primary mr-2" />
                <span>2 year warranty</span>
              </li>
              <li className="flex items-center">
                <FaUndo className="text-primary mr-2" />
                <span>30-day return policy</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;