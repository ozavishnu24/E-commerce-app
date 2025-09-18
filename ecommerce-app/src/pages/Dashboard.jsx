import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getCategories, getProductsByCategory } from '../features/products/productsSlice';
import Layout from '../components/layout/Layout';
import Banner from '../components/common/Banner';
import ProductList from '../components/products/ProductList';
import { FaTruck, FaShieldAlt, FaUndo, FaHeadset } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(state => state.products);
  
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);
  
  const features = [
    {
      icon: <FaTruck className="text-3xl text-primary" />,
      title: 'Free Shipping',
      description: 'On all orders over $50'
    },
    {
      icon: <FaShieldAlt className="text-3xl text-primary" />,
      title: 'Secure Payment',
      description: '100% secure payment process'
    },
    {
      icon: <FaUndo className="text-3xl text-primary" />,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: <FaHeadset className="text-3xl text-primary" />,
      title: '24/7 Support',
      description: 'Dedicated customer support'
    }
  ];
  
  return (
    <Layout>
      <Banner />
      
      {/* Categories Section */}
      <div className="my-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => dispatch(getProductsByCategory(category === 'all' ? '' : category))}
              className={`px-4 py-2 rounded-full capitalize ${
                selectedCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="my-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link 
            to="/products" 
            className="text-primary hover:text-primary-dark font-medium"
          >
            View All
          </Link>
        </div>
        <ProductList category={selectedCategory} />
      </div>
      
      {/* Features Section */}
      <div className="my-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="my-16 bg-primary rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Get the latest updates on new products and special sales
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 rounded-md text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-dark text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Dashboard;