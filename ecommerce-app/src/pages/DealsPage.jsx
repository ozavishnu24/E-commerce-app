import React from 'react';
import Layout from '../components/layout/Layout';

const DealsPage = () => {
  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Special Deals</h1>
        <p className="text-lg text-gray-700 mb-8">
          Check out our latest deals and discounts on popular products!
        </p>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Deals page coming soon!</p>
          <p className="text-gray-600">In the meantime, check out our products page for great offers.</p>
        </div>
      </div>
    </Layout>
  );
};

export default DealsPage;