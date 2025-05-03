
import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Truck, ShieldCheck } from 'lucide-react';
import { Product } from '@/lib/mockData';

interface ProductDetailProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="bg-white animate-fade-in">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-72 object-cover"
        />
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
          <Heart className="h-6 w-6 text-gray-400" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500">Sold by {product.seller}</p>
          </div>
          <div className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</div>
        </div>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-gray-700">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-gray-500">{product.reviews} reviews</span>
        </div>

        <div className="border-t border-gray-100 my-4"></div>
        
        <p className="text-gray-700 mb-4">{product.description}</p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center border border-gray-200 rounded">
            <button 
              onClick={handleDecrement}
              className="px-3 py-1 text-gray-600"
              disabled={quantity === 1}
            >
              -
            </button>
            <span className="px-4 py-1 border-x border-gray-200">{quantity}</span>
            <button 
              onClick={handleIncrement}
              className="px-3 py-1 text-gray-600"
            >
              +
            </button>
          </div>
          
          <div className="text-gray-500">
            {product.inStock ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>
        </div>

        <button 
          onClick={onAddToCart}
          disabled={!product.inStock}
          className={`w-full py-3 px-4 rounded-lg text-white flex items-center justify-center font-medium mb-3 ${
            product.inStock ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </button>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Truck className="h-4 w-4 mr-2 text-primary" />
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
