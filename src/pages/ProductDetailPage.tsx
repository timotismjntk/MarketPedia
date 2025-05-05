
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import ProductDetail from '@/components/products/ProductDetail';
import ProductReviews from '@/components/products/ProductReviews';
import { mockProducts, Product } from '@/lib/mockData';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Get seller ID based on seller name
  const getSellerIdFromName = (sellerName: string) => {
    if (sellerName === 'TechGadgets') return 'seller1';
    if (sellerName === 'StyleHub') return 'seller2';
    return 'unknown';
  };

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="app-container px-4 pt-4 flex items-center justify-center h-screen">
        <div className="animate-pulse text-center">
          <div className="h-72 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-4 mx-auto"></div>
          <div className="h-24 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="app-container px-4 pt-4">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 -ml-2 text-gray-600"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold ml-2">Product Not Found</h1>
        </div>
        
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Sorry, the product you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const sellerId = getSellerIdFromName(product.seller);

  return (
    <div className="app-container pb-16">
      <div className="sticky top-0 bg-white z-10 px-4 py-3 flex items-center shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium ml-2 line-clamp-1">
          {product.name}
        </h1>
      </div>
      
      <ProductDetail 
        product={product} 
        onAddToCart={() => addItem(product, 1)}
      />
      
      {/* Seller Section */}
      <div className="p-4 border-t border-b">
        <Link to={`/seller/${sellerId}`} className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <User size={20} className="text-gray-500" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium">{product.seller}</h3>
            <p className="text-xs text-gray-500">View Shop</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Visit Store
          </Button>
        </Link>
      </div>
      
      {/* Product Reviews */}
      <div className="p-4">
        <ProductReviews productId={product.id} />
      </div>
      
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Similar Products</h2>
        <div className="grid grid-cols-2 gap-4">
          {mockProducts
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map(p => (
              <div 
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 cursor-pointer"
              >
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-medium text-sm line-clamp-1">{p.name}</h3>
                  <p className="text-primary font-bold text-sm">${p.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
