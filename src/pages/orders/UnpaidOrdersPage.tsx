
import React from 'react';
import { ArrowLeft, ShoppingBag, ChevronRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock unpaid orders
const mockUnpaidOrders = [
  {
    id: 'ORD-4567',
    date: '2023-05-10',
    total: 139.98,
    items: 2,
    expiresIn: '23:45:12',
    products: [
      { name: 'Wireless Earbuds', price: 79.99, quantity: 1 },
      { name: 'Phone Case', price: 29.99, quantity: 2 }
    ]
  },
  {
    id: 'ORD-5678',
    date: '2023-05-09',
    total: 249.99,
    items: 1,
    expiresIn: '11:30:45',
    products: [
      { name: 'Smart Watch', price: 249.99, quantity: 1 }
    ]
  }
];

const UnpaidOrdersPage: React.FC = () => {
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
        <h1 className="text-xl font-semibold ml-2">Unpaid Orders</h1>
      </div>
      
      <div className="space-y-4">
        {mockUnpaidOrders.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No unpaid orders</p>
          </div>
        ) : (
          mockUnpaidOrders.map((order) => (
            <div 
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{order.id}</h3>
                  <div className="flex items-center text-yellow-600 bg-yellow-50 px-2 py-1 rounded text-xs">
                    <AlertTriangle size={14} className="mr-1" />
                    <span>Pay now</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span>Order Date: {new Date(order.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                </div>
              </div>
              
              <div className="px-4 py-2">
                {order.products.map((product, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {product.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Expires in:</p>
                  <p className="text-sm font-medium text-red-500">{order.expiresIn}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-right font-medium">Total: ${order.total.toFixed(2)}</p>
                  <Button 
                    onClick={() => navigate('/payment')}
                    className="px-4 py-1 h-8"
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UnpaidOrdersPage;
