
import React from 'react';
import { ShoppingCart as CartIcon } from 'lucide-react';
import CartItem from './CartItem';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';

const ShoppingCart: React.FC = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart,
    subtotal 
  } = useCart();
  
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="py-10 text-center">
        <div className="flex justify-center mb-4">
          <CartIcon size={48} className="text-gray-300" />
        </div>
        <h2 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Add items to your cart to see them here</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Cart ({items.length})</h2>
        <button 
          onClick={clearCart}
          className="text-sm text-primary hover:underline"
        >
          Clear all
        </button>
      </div>
      
      <div className="space-y-2">
        {items.map((item) => (
          <CartItem 
            key={item.product.id}
            product={item.product}
            quantity={item.quantity}
            onRemove={() => removeItem(item.product.id)}
            onUpdateQuantity={(qty) => updateQuantity(item.product.id, qty)}
          />
        ))}
      </div>
      
      <div className="mt-6 border-t border-gray-100 pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">Calculated at checkout</span>
        </div>
        <div className="flex justify-between mb-4 text-lg font-bold">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <button 
          className="w-full bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
