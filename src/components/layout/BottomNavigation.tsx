
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, Heart } from 'lucide-react';

const BottomNavigation = () => {
  return (
    <nav className="bottom-nav h-16 flex items-center justify-around px-4">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
        end
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>
      
      <NavLink 
        to="/products" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Search size={24} />
        <span className="text-xs mt-1">Search</span>
      </NavLink>
      
      <NavLink 
        to="/wishlist" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Heart size={24} />
        <span className="text-xs mt-1">Wishlist</span>
      </NavLink>
      
      <NavLink 
        to="/cart" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <ShoppingCart size={24} />
        <span className="text-xs mt-1">Cart</span>
      </NavLink>
      
      <NavLink 
        to="/profile" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
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
