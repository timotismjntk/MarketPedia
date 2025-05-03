
import React from 'react';
import { Trash } from 'lucide-react';
import { Product } from '@/lib/mockData';

interface CartItemProps {
  product: Product;
  quantity: number;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  product, 
  quantity, 
  onRemove, 
  onUpdateQuantity 
}) => {
  return (
    <div className="flex border-b border-gray-100 py-4">
      <div className="w-20 h-20 rounded-lg overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 ml-4">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <button 
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash size={18} />
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mb-2">{product.seller}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center border border-gray-200 rounded">
            <button 
              onClick={() => onUpdateQuantity(quantity - 1)}
              className="px-2 py-1 text-gray-600"
              disabled={quantity === 1}
            >
              -
            </button>
            <span className="px-3 py-1 border-x border-gray-200">{quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(quantity + 1)}
              className="px-2 py-1 text-gray-600"
            >
              +
            </button>
          </div>
          
          <div className="text-primary font-semibold">
            ${(product.price * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
