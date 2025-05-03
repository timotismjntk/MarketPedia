
import React from 'react';
import { Outlet } from 'react-router-dom';
import SellerNavigation from './SellerNavigation';

const SellerLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Outlet />
      <SellerNavigation />
    </div>
  );
};

export default SellerLayout;
