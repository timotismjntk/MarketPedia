
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockProducts, mockLiveStreams } from '@/lib/mockData';
import LiveStreamPopup from '@/components/live/LiveStreamPopup';
import SellerProfileHeader from '@/components/seller/SellerProfileHeader';
import SellerProductSearch from '@/components/seller/SellerProductSearch';
import SellerProductSection from '@/components/seller/SellerProductSection';

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
  const [liveStream, setLiveStream] = useState<any>(null);
  const [showLivePopup, setShowLivePopup] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const foundSeller = mockSellers.find(s => s.id === id);
      setSeller(foundSeller || null);
      
      // Check if seller has an active live stream
      if (foundSeller) {
        const activeStream = mockLiveStreams.find(
          stream => stream.sellerId === foundSeller.id && stream.isLive
        );
        
        if (activeStream) {
          setLiveStream(activeStream);
          setShowLivePopup(true);
        }
      }
      
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

  const handleChatWithSeller = () => {
    // Find if there's an existing chat with this seller
    const sellerId = seller.id;
    // Navigate to chat page - in a real app, would look for existing chat
    navigate(`/chat/${sellerId}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

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
      {/* Seller Profile Header */}
      <SellerProfileHeader 
        seller={seller}
        liveStream={liveStream}
        onChatClick={handleChatWithSeller}
      />
      
      {/* Search and Filters */}
      <SellerProductSearch
        categories={seller.categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      
      {/* Product List */}
      <SellerProductSection 
        products={sellerProducts}
        onClearFilters={handleClearFilters}
      />
      
      {/* Live Stream Popup */}
      {liveStream && showLivePopup && (
        <LiveStreamPopup 
          stream={liveStream} 
          onClose={() => setShowLivePopup(false)} 
        />
      )}
    </div>
  );
};

export default SellerProfilePage;
