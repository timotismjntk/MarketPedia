
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, Heart, Bell } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const BottomNavigation = () => {
  const { totalItems } = useCart();
  
  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around px-4 bg-white border-t border-gray-200 z-10">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/6 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
        end
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>
      
      <NavLink 
        to="/cart" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/6 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <div className="relative">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
        <span className="text-xs mt-1">Cart</span>
      </NavLink>
      
      <NavLink 
        to="/wishlist" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/6 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Heart size={24} />
        <span className="text-xs mt-1">Wishlist</span>
      </NavLink>
      
      <NavLink 
        to="/profile" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/6 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;
