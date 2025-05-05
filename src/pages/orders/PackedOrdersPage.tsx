
import React from 'react';
import { ArrowLeft, Package, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock packed orders
const mockPackedOrders = [
  {
    id: 'ORD-6789',
    date: '2023-04-30',
    total: 89.97,
    items: 3,
    status: 'packed',
    seller: 'TechGadgets',
    estimatedShipping: '2-3 days'
  },
  {
    id: 'ORD-7890',
    date: '2023-04-28',
    total: 149.99,
    items: 1,
    status: 'packed',
    seller: 'HomeOffice',
    estimatedShipping: '1-2 days'
  }
];

const PackedOrdersPage: React.FC = () => {
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
        <h1 className="text-xl font-semibold ml-2">Packed Orders</h1>
      </div>
      
      <div className="space-y-4">
        {mockPackedOrders.length === 0 ? (
          <div className="text-center py-10">
            <Package size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No packed orders</p>
          </div>
        ) : (
          mockPackedOrders.map((order) => (
            <div 
              key={order.id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
              onClick={() => navigate(`/order/${order.id}`)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{order.id}</h3>
                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Ready for shipping
                </span>
              </div>
              
              <div className="text-sm text-gray-500 mb-3">
                <span>Order Date: {new Date(order.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm">
                  <span className="text-gray-500">Seller:</span> {order.seller}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Est. Shipping:</span> {order.estimatedShipping}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
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
          ))
        )}
      </div>
    </div>
  );
};

export default PackedOrdersPage;
