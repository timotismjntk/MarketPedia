
import React from 'react';
import { ArrowLeft, Truck, ChevronRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock shipped orders
const mockShippedOrders = [
  {
    id: 'ORD-8901',
    date: '2023-04-25',
    total: 119.98,
    items: 2,
    status: 'shipped',
    estimatedDelivery: 'May 15, 2023',
    trackingNumber: 'TRK1234567890',
    currentLocation: 'Distribution Center, Newark, NJ'
  },
  {
    id: 'ORD-9012',
    date: '2023-04-20',
    total: 59.99,
    items: 1,
    status: 'shipped',
    estimatedDelivery: 'May 12, 2023',
    trackingNumber: 'TRK9876543210',
    currentLocation: 'Local Delivery Facility, Boston, MA'
  }
];

const ShippedOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="app-container px-4 pt-4">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Shipped Orders</h1>
      </div>
      
      <div className="space-y-4">
        {mockShippedOrders.length === 0 ? (
          <div className="text-center py-10">
            <Truck size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No shipped orders</p>
          </div>
        ) : (
          mockShippedOrders.map((order) => (
            <div 
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              onClick={() => navigate(`/order/${order.id}`)}
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{order.id}</h3>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    On the way
                  </span>
                </div>
                
                <div className="text-sm text-gray-500">
                  <span>Order Date: {new Date(order.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-xs text-gray-500">TRACKING NUMBER</p>
                  <p className="text-sm font-medium">{order.trackingNumber}</p>
                </div>
                
                <div className="flex items-start mb-3">
                  <MapPin size={16} className="text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">CURRENT LOCATION</p>
                    <p className="text-sm">{order.currentLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Truck size={16} className="text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">ESTIMATED DELIVERY</p>
                    <p className="text-sm">{order.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50">
                <div className="flex items-center">
                  <Truck className="text-primary mr-2" size={18} />
                  <span>Track Delivery</span>
                </div>
                
                <div className="flex items-center">
                  <span className="font-medium text-primary mr-2">
                    ${order.total.toFixed(2)}
                  </span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShippedOrdersPage;
