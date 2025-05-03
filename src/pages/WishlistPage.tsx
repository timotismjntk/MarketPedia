
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductList from '@/components/products/ProductList';
import { mockProducts } from '@/lib/mockData';

// Mock wishlist data (in a real app, this would come from an API or context)
const wishlistItems = mockProducts.slice(0, 4);

const WishlistPage: React.FC = () => {
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
        <h1 className="text-xl font-semibold ml-2">My Wishlist</h1>
      </div>
      
      {wishlistItems.length > 0 ? (
        <ProductList products={wishlistItems} />
      ) : (
        <div className="py-10 text-center">
          <p className="text-gray-500">Your wishlist is empty.</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 text-primary font-medium"
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
