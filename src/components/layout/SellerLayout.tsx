
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import SellerNavigation from './SellerNavigation';
import { User } from 'lucide-react';

const SellerLayout: React.FC = () => {
  return (
    <div className="app-container min-h-screen flex flex-col">
      <header className="border-b bg-white py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/seller" className="font-bold text-lg text-primary">Seller Dashboard</Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-gray-600 hover:text-primary">
              Back to App
            </Link>
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-1 pb-16">
        <Outlet />
      </div>
      <SellerNavigation />
    </div>
  );
};

export default SellerLayout;
