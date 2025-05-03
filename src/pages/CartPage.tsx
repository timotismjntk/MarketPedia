
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShoppingCart from '@/components/cart/ShoppingCart';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="app-container px-4 pt-4">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Shopping Cart</h1>
      </div>
      
      <ShoppingCart />
    </div>
  );
};

export default CartPage;
