
import React from 'react';
import { ArrowLeft, Star, ChevronRight, Package, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock orders to be rated
const mockOrdersToRate = [
  {
    id: 'ORD-0123',
    date: '2023-04-15',
    total: 79.98,
    items: [
      { 
        id: 'prod-1',
        name: 'Modern Wireless Earbuds',
        price: 59.99,
        image: '/placeholder.svg'
      },
      { 
        id: 'prod-2',
        name: 'Phone Charging Cable',
        price: 19.99,
        image: '/placeholder.svg'
      }
    ],
    deliveredOn: 'April 20, 2023'
  },
  {
    id: 'ORD-1234',
    date: '2023-04-10',
    total: 129.99,
    items: [
      { 
        id: 'prod-3',
        name: 'Smart Home Speaker',
        price: 129.99,
        image: '/placeholder.svg'
      }
    ],
    deliveredOn: 'April 17, 2023'
  }
];

const RateOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="app-container px-4 pt-4 pb-20">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Rate Orders</h1>
      </div>
      
      <div className="space-y-6">
        {mockOrdersToRate.length === 0 ? (
          <div className="text-center py-10">
            <Star size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No orders to rate</p>
          </div>
        ) : (
          mockOrdersToRate.map((order) => (
            <div 
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{order.id}</h3>
                  <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
                    <CheckCircle size={14} className="mr-1" />
                    <span>Delivered</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span>Delivered on: {order.deliveredOn}</span>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <p className="font-medium mb-1">{item.name}</p>
                        <p className="text-sm text-gray-500 mb-2">${item.price.toFixed(2)}</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center"
                          onClick={() => navigate(`/product/${item.id}?rate=true`)}
                        >
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          <span>Write a Review</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center">
                  <Package className="text-gray-500 mr-2" size={18} />
                  <span className="text-sm text-gray-500">Order completed</span>
                </div>
                <span className="font-medium text-primary">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RateOrdersPage;
