
import React from 'react';
import { ArrowLeft, Package, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock orders for demonstration
const mockOrders = [
  {
    id: 'ORD-1234',
    date: '2023-05-01',
    total: 159.98,
    status: 'delivered',
    items: 3
  },
  {
    id: 'ORD-2345',
    date: '2023-04-25',
    total: 49.99,
    status: 'shipped',
    items: 1
  },
  {
    id: 'ORD-3456',
    date: '2023-04-15',
    total: 79.98,
    status: 'processing',
    items: 2
  }
];

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="app-container px-4 pt-4">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">My Orders</h1>
      </div>
      
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div 
            key={order.id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            onClick={() => navigate(`/order/${order.id}`)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{order.id}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            
            <div className="text-sm text-gray-500 mb-4">
              <span>Order Date: {new Date(order.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Package className="text-primary mr-2" size={18} />
                <span>Track Order</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-medium text-primary mr-2">
                  ${order.total.toFixed(2)}
                </span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
