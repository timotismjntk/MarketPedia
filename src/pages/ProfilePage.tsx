
import React from 'react';
import { 
  User, Settings, LogOut, ShoppingBag, 
  Heart, Star, Truck, MapPin, Gem, Bell
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  return (
    <div className="app-container px-4 pt-4">
      <h1 className="text-xl font-semibold mb-6">Profile</h1>
      
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
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
        <Link to={`/orders`}>
          <div className="p-4 flex justify-between">
            <button className="text-gray-600 text-sm">View Order History</button>
            <span className="text-primary text-sm">See All</span>
          </div>
        </Link>
        <div className="grid grid-cols-4 gap-4 px-4 py-4 border-b border-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-1">
              <ShoppingBag size={20} className="text-primary" />
            </div>
            <span className="text-xs text-gray-600">To Pay</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-1">
              <Truck size={20} className="text-primary" />
            </div>
            <span className="text-xs text-gray-600">To Ship</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-1">
              <MapPin size={20} className="text-primary" />
            </div>
            <span className="text-xs text-gray-600">To Receive</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-1">
              <Star size={20} className="text-primary" />
            </div>
            <span className="text-xs text-gray-600">To Review</span>
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
            <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
              <Bell size={20} className="text-gray-500 mr-3" />
              <span className="text-gray-700">Notifications</span>
            </button>
          </Link>
          
          <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
            <Settings size={20} className="text-gray-500 mr-3" />
            <span className="text-gray-700">Account Settings</span>
          </button>
          
          <button className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-gray-50">
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
