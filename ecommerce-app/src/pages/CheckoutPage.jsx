import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CartSummary from '../components/Cart/CartSummary';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const CheckoutPage = () => {
  const { items, totalAmount, totalQuantity } = useSelector(state => state.cart);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });
  
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Here you would typically process the payment and create the order
    alert('Order placed successfully!');
    // Redirect to order confirmation page
    // window.location.href = '/order-confirmation';
  };
  
  // Calculate shipping and tax
  const shippingCost = totalAmount > 50 ? 0 : 5.99;
  const tax = totalAmount * 0.08;
  const orderTotal = totalAmount + shippingCost + tax;
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Add some products to your cart to proceed with checkout.</p>
            <Link
              to="/"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stepNumber}
                    </div>
                    <span className={`ml-2 ${step >= stepNumber ? 'text-primary' : 'text-gray-500'}`}>
                      {stepNumber === 1 ? 'Shipping' : stepNumber === 2 ? 'Payment' : 'Review'}
                    </span>
                    {stepNumber < 3 && (
                      <div className={`w-16 h-1 mx-4 ${step > stepNumber ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        value={shippingInfo.fullName}
                        onChange={handleShippingChange}
                        placeholder="John Doe"
                        required
                      />
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        label="Email Address"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      label="Address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      placeholder="123 Main St"
                      required
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        type="text"
                        id="city"
                        name="city"
                        label="City"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        placeholder="New York"
                        required
                      />
                      <Input
                        type="text"
                        id="state"
                        name="state"
                        label="State"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        placeholder="NY"
                        required
                      />
                      <Input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        label="ZIP Code"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        placeholder="10001"
                        required
                      />
                    </div>
                    
                    <Input
                      type="text"
                      id="country"
                      name="country"
                      label="Country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      placeholder="United States"
                      required
                    />
                    
                    <div className="flex justify-end mt-6">
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        variant="primary"
                        size="lg"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Step 2: Payment Information */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  <form className="space-y-4">
                    <Input
                      type="text"
                      id="cardName"
                      name="cardName"
                      label="Name on Card"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      placeholder="John Doe"
                      required
                    />
                    
                    <Input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      label="Card Number"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        label="Expiry Date"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        required
                      />
                      <Input
                        type="text"
                        id="cvv"
                        name="cvv"
                        label="CVV"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        required
                      />
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button
                        type="button"
                        onClick={handlePrevStep}
                        variant="outline"
                        size="lg"
                      >
                        Back to Shipping
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        variant="primary"
                        size="lg"
                      >
                        Review Order
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Step 3: Review Order */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <p className="text-gray-600">{shippingInfo.fullName}</p>
                    <p className="text-gray-600">{shippingInfo.address}</p>
                    <p className="text-gray-600">
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                    </p>
                    <p className="text-gray-600">{shippingInfo.country}</p>
                    <p className="text-gray-600">{shippingInfo.email}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <p className="text-gray-600">Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Order Items</h3>
                    <div className="space-y-2">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.title} (x{item.quantity})</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      onClick={handlePrevStep}
                      variant="outline"
                      size="lg"
                    >
                      Back to Payment
                    </Button>
                    <Button
                      type="button"
                      onClick={handlePlaceOrder}
                      variant="primary"
                      size="lg"
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <CartSummary isCheckoutPage={true} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;