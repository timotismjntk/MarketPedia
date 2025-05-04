
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart, Package, List, Percent, MessageCircle, Video, Upload, Star } from 'lucide-react';

const SellerNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 flex items-center justify-around px-4 z-10">
      <NavLink 
        to="/seller" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/8 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
        end
      >
        <BarChart size={20} />
        <span className="text-xs mt-1">Dashboard</span>
      </NavLink>
      
      <NavLink 
        to="/seller/products" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/8 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Package size={20} />
        <span className="text-xs mt-1">Products</span>
      </NavLink>
      
      <NavLink 
        to="/seller/orders" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/8 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <List size={20} />
        <span className="text-xs mt-1">Orders</span>
      </NavLink>
      
      <NavLink 
        to="/seller/reviews" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/8 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Star size={20} />
        <span className="text-xs mt-1">Reviews</span>
      </NavLink>
      
      <NavLink 
        to="/seller/promotions" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/8 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Percent size={20} />
        <span className="text-xs mt-1">Promos</span>
      </NavLink>
      
      <NavLink 
        to="/seller/chat" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/8 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <MessageCircle size={20} />
        <span className="text-xs mt-1">Chat</span>
      </NavLink>

      <NavLink 
        to="/seller/upload" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/8 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Upload size={20} />
        <span className="text-xs mt-1">Upload</span>
      </NavLink>
      
      <NavLink 
        to="/seller/live" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/8 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Video size={20} />
        <span className="text-xs mt-1">Live</span>
      </NavLink>
    </nav>
  );
};

export default SellerNavigation;
