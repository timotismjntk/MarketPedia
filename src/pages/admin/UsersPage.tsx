
import React from 'react';

const AdminUsersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">All Users</h2>
        </div>
        
        <div className="border rounded-lg p-6 text-center text-gray-500">
          <p>User accounts will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
