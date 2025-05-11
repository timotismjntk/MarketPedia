import React, { useState, useEffect } from 'react';
import { 
  User, Settings, LogOut, ShoppingBag, 
  Heart, Star, Truck, MapPin, Gem, Bell, Edit,
  Package, CheckCircle
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';
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
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">My Account</h1>
          <Link to="/profile/edit">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
            >
              <Edit size={16} />
              Edit
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Summary */}
        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-100">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
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
              <h2 className="text-lg font-semibold text-gray-800">{currentUser.name}</h2>
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            </div>
          </div>
          {addresses.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-start">
                <MapPin className="text-gray-400 mt-1" size={16} />
                <div className="ml-3">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">Default Address</span>
                    <Link to="/profile/edit" className="ml-2 text-xs text-primary hover:text-primary-600">
                      Change
                    </Link>
                  </div>
                  {addresses.find((a) => a.isDefault) && (
                    <p className="text-sm text-gray-500 mt-1">
                      {addresses.find((a) => a.isDefault)?.street},{' '}
                      {addresses.find((a) => a.isDefault)?.city},{' '}
                      {addresses.find((a) => a.isDefault)?.state}{' '}
                      {addresses.find((a) => a.isDefault)?.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Status */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">My Orders</h2>
            <Link to="/orders" className="text-sm text-primary hover:text-primary-600">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 hover:bg-primary/10 transition-colors cursor-pointer"
              onClick={() => handleNavigateToOrders('unpaid')}
            >
              <ShoppingBag size={24} className="text-primary mb-2" />
              <span className="text-sm font-medium text-gray-700">Unpaid</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 hover:bg-primary/10 transition-colors cursor-pointer"
              onClick={() => handleNavigateToOrders('packed')}
            >
              <Package size={24} className="text-primary mb-2" />
              <span className="text-sm font-medium text-gray-700">Packed</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 hover:bg-primary/10 transition-colors cursor-pointer"
              onClick={() => handleNavigateToOrders('shipped')}
            >
              <Truck size={24} className="text-primary mb-2" />
              <span className="text-sm font-medium text-gray-700">Shipped</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 hover:bg-primary/10 transition-colors cursor-pointer"
              onClick={() => handleNavigateToOrders('rate')}
            >
              <Star size={24} className="text-primary mb-2" />
              <span className="text-sm font-medium text-gray-700">Rate</span>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 px-6 pt-6 pb-4">Account Settings</h3>
          <div className="divide-y divide-gray-100">
            <Link to="/loyalty">
              <div className="flex items-center px-6 py-4 hover:bg-primary/10 transition-colors">
                <Gem size={20} className="text-gray-500 mr-4" />
                <span className="text-gray-700 font-medium">Loyalty</span>
              </div>
            </Link>
            <Link to="/notifications">
              <div className="flex items-center px-6 py-4 hover:bg-primary/10 transition-colors justify-between">
                <div className="flex items-center">
                  <Bell size={20} className="text-gray-500 mr-4" />
                  <span className="text-gray-700 font-medium">Notifications</span>
                </div>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
            </Link>
            <Link to="/settings/account">
              <div className="flex items-center px-6 py-4 hover:bg-primary/10 transition-colors">
                <Settings size={20} className="text-gray-500 mr-4" />
                <span className="text-gray-700 font-medium">Account Settings</span>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-6 py-4 text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} className="mr-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 lg:hidden">
          <div className="flex justify-around py-3">
            <Link to="/orders" className="flex flex-col items-center text-gray-600 hover:text-primary">
              <ShoppingBag size={20} />
              <span className="text-xs mt-1">Orders</span>
            </Link>
            <Link to="/loyalty" className="flex flex-col items-center text-gray-600 hover:text-primary">
              <Gem size={20} />
              <span className="text-xs mt-1">Loyalty</span>
            </Link>
            <Link to="/notifications" className="flex flex-col items-center text-gray-600 hover:text-primary relative">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
              <span className="text-xs mt-1">Notifications</span>
            </Link>
            <Link to="/settings/account" className="flex flex-col items-center text-gray-600 hover:text-primary">
              <Settings size={20} />
              <span className="text-xs mt-1">Settings</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ProfilePage;