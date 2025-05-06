
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const hideBottomNav = ['/checkout', '/payment'].includes(location.pathname);
  
  return (
    <div className="app-container min-h-screen flex flex-col bg-white">
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      {!hideBottomNav && <BottomNavigation />}
    </div>
  );
};

export default MainLayout;
