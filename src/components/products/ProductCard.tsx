
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/lib/mockData';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Get seller ID based on seller name
  const getSellerIdFromName = (sellerName: string) => {
    if (sellerName === 'TechGadgets') return 'seller1';
    if (sellerName === 'StyleHub') return 'seller2';
    return 'unknown';
  };

  const sellerId = getSellerIdFromName(product.seller);

  return (
    <div className="product-card bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <button 
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist functionality here
            }}
          >
            <Heart className="w-5 h-5 text-gray-400 hover:text-primary transition-colors" />
          </button>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
        <div className="flex items-center mt-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-700 ml-1">{product.rating}</span>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          <Link to={`/seller/${sellerId}`} 
                className="text-xs text-primary hover:underline ml-auto">
            {product.seller}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
