
import React from 'react';

const SellerPromotionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Promotions</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Promotions</h2>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center">
            <span className="mr-1">Create Promotion</span>
          </button>
        </div>
        
        <div className="border rounded-lg p-6 text-center text-gray-500">
          <p>Your promotions and discounts will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default SellerPromotionsPage;
