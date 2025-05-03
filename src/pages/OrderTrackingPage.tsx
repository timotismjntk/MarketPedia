
import React from 'react';
import { ArrowLeft, Package, Check, Truck, Home } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

// Mock order for demonstration
const mockOrder = {
  id: 'ORD-1234',
  date: '2023-05-01',
  total: 159.98,
  status: 'shipped',
  items: [
    {
      id: '1',
      name: 'Modern Wireless Earbuds',
      price: 59.99,
      image: '/placeholder.svg',
      quantity: 2
    },
    {
      id: '3',
      name: 'Smart Home Speaker',
      price: 39.99,
      image: '/placeholder.svg',
      quantity: 1
    }
  ],
  tracking: [
    {
      step: 'Order Placed',
      date: '2023-05-01',
      time: '10:30 AM',
      completed: true
    },
    {
      step: 'Order Confirmed',
      date: '2023-05-01',
      time: '11:45 AM',
      completed: true
    },
    {
      step: 'Order Shipped',
      date: '2023-05-02',
      time: '09:15 AM',
      completed: true
    },
    {
      step: 'Out for Delivery',
      date: '2023-05-04',
      time: '08:30 AM',
      completed: false
    },
    {
      step: 'Delivered',
      date: '',
      time: '',
      completed: false
    }
  ],
  shippingAddress: {
    name: 'John Doe',
    phone: '+1 123-456-7890',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001'
  },
  deliveryEstimate: '2023-05-05'
};

const OrderTrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="app-container px-4 pt-4 pb-20">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/orders')}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Order #{id}</h1>
      </div>
      
      <div className="space-y-6">
        {/* Tracking Status */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <h2 className="font-medium mb-4">Tracking Status</h2>
          
          <div className="relative">
            {mockOrder.tracking.map((step, index) => (
              <div key={index} className="flex mb-5 last:mb-0">
                {/* Indicator */}
                <div className="mr-3 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.completed ? <Check size={18} /> : index + 1}
                  </div>
                  
                  {/* Connecting line */}
                  {index < mockOrder.tracking.length - 1 && (
                    <div className={`w-0.5 h-10 ${
                      step.completed ? 'bg-primary' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
                
                {/* Step details */}
                <div>
                  <p className="font-medium">{step.step}</p>
                  {step.date && (
                    <p className="text-sm text-gray-500">
                      {step.date} at {step.time}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 text-blue-600 rounded-lg text-sm">
            <p>Estimated Delivery Date: {mockOrder.deliveryEstimate}</p>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <h2 className="font-medium mb-4">Order Items</h2>
          
          <div className="space-y-3">
            {mockOrder.items.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="w-16 h-16 rounded overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium line-clamp-1">{item.name}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-bold">${mockOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <h2 className="font-medium mb-4">Shipping Information</h2>
          
          <div className="text-sm">
            <p className="font-medium">{mockOrder.shippingAddress.name}</p>
            <p className="text-gray-600">{mockOrder.shippingAddress.phone}</p>
            <p className="text-gray-600">{mockOrder.shippingAddress.address}</p>
            <p className="text-gray-600">
              {mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state} {mockOrder.shippingAddress.zip}
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Support Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <button 
          className="w-full bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
          onClick={() => navigate('/chat')}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
