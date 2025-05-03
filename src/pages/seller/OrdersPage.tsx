
import React from 'react';

const SellerOrdersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Incoming Orders</h2>
        </div>
        
        <div className="border rounded-lg p-6 text-center text-gray-500">
          <p>Your customer orders will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default SellerOrdersPage;
