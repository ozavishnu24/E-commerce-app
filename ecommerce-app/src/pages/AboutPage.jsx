import React from 'react';
import Layout from '../components/layout/Layout';
import { FaTruck, FaShieldAlt, FaUndo, FaHeadset, FaStar, FaAward, FaUsers } from 'react-icons/fa';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "John Smith",
      position: "CEO & Founder",
      bio: "With over 15 years of experience in e-commerce, John founded ShopEase with a vision to make online shopping simple and accessible."
    },
    {
      name: "Sarah Johnson",
      position: "Chief Technology Officer",
      bio: "Sarah leads our tech team with her expertise in scalable web applications and user experience design."
    },
    {
      name: "Michael Chen",
      position: "Head of Marketing",
      bio: "Michael drives our growth strategies and ensures our customers know about the amazing deals we offer."
    }
  ];

  const milestones = [
    { year: "2018", title: "Company Founded", description: "ShopEase was founded with a mission to provide quality products at affordable prices." },
    { year: "2019", title: "First 10,000 Customers", description: "Reached our first major milestone of serving 10,000 happy customers." },
    { year: "2020", title: "Expanded Product Range", description: "Doubled our product categories to include electronics, home goods, and more." },
    { year: "2021", title: "International Shipping", description: "Started offering international shipping to over 20 countries." },
    { year: "2023", title: "1 Million Customers", description: "Celebrated serving over 1 million customers worldwide." }
  ];

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">About ShopEase</h1>
        
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to ShopEase, your one-stop destination for all your shopping needs. Founded in 2018, we've grown from a small startup to a trusted e-commerce platform serving millions of customers worldwide.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our mission is to provide high-quality products at competitive prices while ensuring an exceptional shopping experience. We carefully curate our product selection to offer only the best items from reputable brands and manufacturers.
          </p>
          <p className="text-lg text-gray-700">
            At ShopEase, we believe that shopping should be easy, enjoyable, and secure. That's why we've invested in creating a user-friendly platform, robust security measures, and a customer support team that's always ready to help.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaStar className="text-3xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">We never compromise on quality and ensure every product meets our high standards.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaShieldAlt className="text-3xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Trust</h3>
              <p className="text-gray-600">We build trust through transparency, honesty, and reliable service.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaUsers className="text-3xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Customer Focus</h3>
              <p className="text-gray-600">Our customers are at the heart of everything we do.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaAward className="text-3xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">We constantly innovate to improve the shopping experience.</p>
            </div>
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Journey</h2>
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                  <div className="w-1/2 px-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <span className="text-primary font-bold">{milestone.year}</span>
                      <h3 className="text-xl font-semibold mt-2 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary border-4 border-white"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary mb-3">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose ShopEase?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaTruck className="text-3xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On all orders over $50</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaShieldAlt className="text-3xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment process</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaUndo className="text-3xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaHeadset className="text-3xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated customer support</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;