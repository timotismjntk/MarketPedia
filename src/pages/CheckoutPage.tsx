
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

type ShippingMethod = 'standard' | 'express' | 'same-day';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  
  const shippingCosts = {
    standard: 5,
    express: 10,
    'same-day': 15
  };
  
  const shippingCost = shippingCosts[shippingMethod];
  const total = subtotal + shippingCost;
  
  const handleProceedToPayment = () => {
    navigate('/payment');
  };
  
  return (
    <div className="app-container px-4 pt-4 pb-24">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/cart')}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Checkout</h1>
      </div>
      
      <div className="space-y-6">
        {/* Address Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <MapPin className="text-primary mr-2" size={20} />
              <h2 className="font-medium">Delivery Address</h2>
            </div>
            <button className="text-sm text-primary">Change</button>
          </div>
          
          <div className="text-sm">
            <p className="font-medium">John Doe</p>
            <p className="text-gray-600">+1 123-456-7890</p>
            <p className="text-gray-600">123 Main Street, Apt 4B</p>
            <p className="text-gray-600">New York, NY 10001</p>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <h2 className="font-medium mb-3">Order Summary ({items.length} items)</h2>
          
          <div className="space-y-3 max-h-48 overflow-auto mb-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center">
                <div className="w-12 h-12 rounded overflow-hidden">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>x{item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Shipping Method */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center mb-3">
            <Truck className="text-primary mr-2" size={20} />
            <h2 className="font-medium">Shipping Method</h2>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium">Standard Delivery</p>
                  <p className="text-sm text-gray-500">3-5 business days</p>
                </div>
              </div>
              <span className="font-medium">${shippingCosts.standard.toFixed(2)}</span>
            </label>
            
            <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium">Express Delivery</p>
                  <p className="text-sm text-gray-500">1-2 business days</p>
                </div>
              </div>
              <span className="font-medium">${shippingCosts.express.toFixed(2)}</span>
            </label>
            
            <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'same-day'}
                  onChange={() => setShippingMethod('same-day')}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium">Same Day Delivery</p>
                  <p className="text-sm text-gray-500">Within 24 hours</p>
                </div>
              </div>
              <span className="font-medium">${shippingCosts['same-day'].toFixed(2)}</span>
            </label>
          </div>
        </div>
        
        {/* Payment Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <h2 className="font-medium mb-3">Order Details</h2>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-100 my-2 pt-2 flex justify-between font-medium text-base">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <Button 
          className="w-full"
          onClick={handleProceedToPayment}
        >
          <CreditCard className="mr-2" size={18} />
          Proceed to Payment (${total.toFixed(2)})
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
