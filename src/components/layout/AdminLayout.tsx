
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavigation from './AdminNavigation';

const AdminLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Outlet />
      <AdminNavigation />
    </div>
  );
};

export default AdminLayout;
