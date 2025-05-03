
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Shield, BarChart, MessageCircle, Percent, Settings } from 'lucide-react';

const AdminNavigation = () => {
  return (
    <nav className="bottom-nav h-16 flex items-center justify-around px-4">
      <NavLink 
        to="/admin" 
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
        to="/admin/users" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Users size={24} />
        <span className="text-xs mt-1">Users</span>
      </NavLink>
      
      <NavLink 
        to="/admin/categories" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <Shield size={24} />
        <span className="text-xs mt-1">Categories</span>
      </NavLink>
      
      <NavLink 
        to="/admin/promotions" 
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
        to="/admin/complaints" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-1/5 ${
            isActive ? 'text-primary' : 'text-gray-500'
          }`
        }
      >
        <MessageCircle size={24} />
        <span className="text-xs mt-1">Support</span>
      </NavLink>
    </nav>
  );
};

export default AdminNavigation;
