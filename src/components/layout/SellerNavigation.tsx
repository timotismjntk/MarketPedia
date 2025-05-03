
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart, Package, List, Percent, MessageCircle, Video, User } from 'lucide-react';

const SellerNavigation = () => {
  return (
    <nav className="bottom-nav h-16 flex items-center justify-around px-4">
      <NavLink 
        to="/seller" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
        end
      >
        <BarChart size={24} />
        <span className="text-xs mt-1">Dashboard</span>
      </NavLink>
      
      <NavLink 
        to="/seller/products" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Package size={24} />
        <span className="text-xs mt-1">Products</span>
      </NavLink>
      
      <NavLink 
        to="/seller/orders" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <List size={24} />
        <span className="text-xs mt-1">Orders</span>
      </NavLink>
      
      <NavLink 
        to="/seller/promotions" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Percent size={24} />
        <span className="text-xs mt-1">Promos</span>
      </NavLink>
      
      <NavLink 
        to="/seller/chat" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <MessageCircle size={24} />
        <span className="text-xs mt-1">Chat</span>
      </NavLink>
    </nav>
  );
};

export default SellerNavigation;
