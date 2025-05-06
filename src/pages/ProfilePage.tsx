import React, { useState, useEffect } from 'react';
import { 
  User, Settings, LogOut, ShoppingBag, 
  Heart, Star, Truck, MapPin, Gem, Bell, Edit,
  Package, CheckCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';

// Import address and payment types from localStorage
interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'credit-card' | 'e-wallet' | 'bank-transfer';
  name: string;
  details: string;
  isDefault: boolean;
}

// Define order status type for filtering
type OrderStatus = 'unpaid' | 'packed' | 'shipped' | 'rate' | 'all';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  
  useEffect(() => {
    // Load addresses and payment methods from localStorage
    const savedAddresses = localStorage.getItem('userAddresses');
    const savedPayments = localStorage.getItem('userPaymentMethods');
    
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
    
    if (savedPayments) {
      setPaymentMethods(JSON.parse(savedPayments));
    }
  }, []);
  
  const handleNavigateToOrders = (status: OrderStatus) => {
    // Navigate to specific order status page
    navigate(`/orders/${status}`);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  return (
    <div className="app-container px-4 pt-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Profile</h1>
        <Link to="/profile/edit">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Edit size={16} />
            <span>Edit</span>
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            {currentUser.avatar ? (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={32} className="text-primary" />
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium">{currentUser.name}</h2>
            <p className="text-gray-500">{currentUser.email}</p>
          </div>
        </div>
        
        {addresses.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <div className="flex items-start">
              <MapPin className="text-gray-500 mt-1" size={16} />
              <div className="ml-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Default Address</span>
                  <Link to="/profile/edit" className="ml-2 text-xs text-primary">Change</Link>
                </div>
                {addresses.find(a => a.isDefault) && (
                  <p className="text-xs text-gray-500">
                    {addresses.find(a => a.isDefault)?.street},
                    {" "}{addresses.find(a => a.isDefault)?.city},{" "}
                    {addresses.find(a => a.isDefault)?.state}{" "}
                    {addresses.find(a => a.isDefault)?.zipCode}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
        <Link to={`/orders`}>
          <div className="p-4 flex justify-between">
            <button className="text-gray-600 text-sm">View Order History</button>
            <span className="text-primary text-sm">See All</span>
          </div>
        </Link>
        <div className="grid grid-cols-4 gap-4 px-4 py-4 border-b border-gray-100">
          <div 
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleNavigateToOrders('unpaid')}
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-1">
              <ShoppingBag size={20} className="text-primary" />
            </div>
            <span className="text-xs text-gray-600">Unpaid</span>
          </div>
          <div 
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleNavigateToOrders('packed')}
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-1">
              <Package size={20} className="text-primary" />
            </div>
            <span className="text-xs text-gray-600">Packed</span>
          </div>
          <div 
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleNavigateToOrders('shipped')}
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-1">
              <Truck size={20} className="text-primary" />
            </div>
            <span className="text-xs text-gray-600">Shipped</span>
          </div>
          <div 
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleNavigateToOrders('rate')}
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-1">
              <Star size={20} className="text-primary" />
            </div>
            <span className="text-xs text-gray-600">Rate</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
        <h3 className="text-lg font-medium px-4 pt-4 pb-2">Account Settings</h3>
        
        <div className="divide-y divide-gray-100">
          <Link to={`/loyalty`}>
            <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
              <Gem size={20} className="text-gray-500 mr-3" />
              <span className="text-gray-700">Loyalty</span>
            </button>
          </Link>
          
          <Link to={`/notifications`}>
            <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50 justify-between">
              <div className="flex items-center">
                <Bell size={20} className="text-gray-500 mr-3" />
                <span className="text-gray-700">Notifications</span>
              </div>
              {unreadCount > 0 && (
                <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </div>
              )}
            </button>
          </Link>
          
          <Link to={`/settings/account`}>
            <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
              <Settings size={20} className="text-gray-500 mr-3" />
              <span className="text-gray-700">Account Settings</span>
            </button>
          </Link>
          
          <button 
            className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-gray-50"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
