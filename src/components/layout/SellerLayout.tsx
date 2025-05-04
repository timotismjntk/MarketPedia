
import React from 'react';
import { Outlet } from 'react-router-dom';
import SellerNavigation from './SellerNavigation';

const SellerLayout: React.FC = () => {
  return (
    <div className="app-container min-h-screen flex flex-col">
      <div className="flex-1 pb-16">
        <Outlet />
      </div>
      <SellerNavigation />
    </div>
  );
};

export default SellerLayout;
