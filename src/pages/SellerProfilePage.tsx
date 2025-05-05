
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Star, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShoppingBag,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductList from '@/components/products/ProductList';
import { mockProducts, Product } from '@/lib/mockData';
import ChatModal from '@/components/ui/chat-modal';

// Mock seller data
const mockSellers = [
  {
    id: 'seller1',
    name: 'TechGadgets',
    description: 'We sell the latest and greatest tech gadgets at affordable prices. Fast shipping and excellent customer service!',
    avatar: '/placeholder.svg',
    coverImage: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    rating: 4.8,
    reviews: 245,
    location: 'Jakarta, Indonesia',
    joinedDate: 'January 2022',
    responseRate: '98%',
    responseTime: 'Within 1 hour',
    followers: 1280,
    products: 86,
    categories: ['Electronics', 'Accessories', 'Gadgets']
  },
  {
    id: 'seller2',
    name: 'StyleHub',
    description: 'Your one-stop fashion destination. Quality clothing and accessories for all styles and occasions.',
    avatar: '/placeholder.svg',
    coverImage: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    rating: 4.6,
    reviews: 189,
    location: 'Surabaya, Indonesia',
    joinedDate: 'March 2021',
    responseRate: '95%',
    responseTime: 'Within 2 hours',
    followers: 950,
    products: 124,
    categories: ['Fashion', 'Clothing', 'Accessories']
  }
];

const SellerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const foundSeller = mockSellers.find(s => s.id === id);
      setSeller(foundSeller || null);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="app-container pt-4 flex flex-col items-center justify-center h-48">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading seller profile...</p>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="app-container px-4 pt-4">
        <div className="text-center py-16">
          <User size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Seller Not Found</h2>
          <p className="text-gray-500 mb-6">The seller you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Filter seller's products
  const sellerProducts = mockProducts
    .filter(product => product.seller === seller.name)
    .filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = selectedCategory === 'All' || 
        product.category === selectedCategory;
        
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="app-container pb-16">
      {/* Cover Image */}
      <div 
        className="w-full h-48 bg-gray-300 bg-cover bg-center"
        style={{ backgroundImage: `url(${seller.coverImage})` }}
      >
        <div className="w-full h-full bg-black/20 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold shadow-text">
            {seller.name}
          </h1>
        </div>
      </div>
      
      {/* Seller Profile Info */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-start">
          <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden -mt-10">
            <img 
              src={seller.avatar} 
              alt={seller.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold">{seller.name}</h1>
                <div className="flex items-center mt-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 font-medium">{seller.rating}</span>
                  <span className="text-gray-500 ml-1">({seller.reviews} reviews)</span>
                </div>
              </div>
              <ChatModal 
                productId={id || 'unknown'} 
                sellerName={seller.name}
                sellerAvatar={seller.avatar}
              />
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600">{seller.description}</p>
        
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>{seller.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2" />
            <span>Joined {seller.joinedDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MessageSquare size={16} className="mr-2" />
            <span>Response rate: {seller.responseRate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <ShoppingBag size={16} className="mr-2" />
            <span>{seller.products} products</span>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="px-4 py-2 border-t border-b bg-gray-50">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search in this shop..."
            className="pl-10 w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex overflow-x-auto gap-2 pb-2">
          <button
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm ${
              selectedCategory === 'All' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          {seller.categories.map((category: string, index: number) => (
            <button
              key={index}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm ${
                category === selectedCategory 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Product List */}
      <div className="px-4">
        <ProductList 
          products={sellerProducts}
          title={`${sellerProducts.length} Products`} 
        />
        
        {sellerProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found matching your criteria.</p>
            <button 
              className="mt-2 text-primary hover:underline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfilePage;
