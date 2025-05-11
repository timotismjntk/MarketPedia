
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Search, 
  MessageSquare,
  Video,
  Users,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProductList from '@/components/products/ProductList';
import { mockProducts, categories, mockLiveStreams } from '@/lib/mockData';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import LiveStreamPopup from '@/components/live/LiveStreamPopup';

function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showLivePopup, setShowLivePopup] = useState(false);
  const [randomLiveStream, setRandomLiveStream] = useState(null);
  
  // Only get live streams that are actually live
  const activeLiveStreams = mockLiveStreams.filter(stream => stream.isLive);
  
  // Get featured products (different ways to select featured products)
  const featuredProducts = mockProducts
    .filter(product => product.rating >= 4.5)
    .slice(0, 4);
    
  const newArrivals = [...mockProducts]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  // Format time for display
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${Math.floor(diffMins / 60)}h ago`;
  };
  
  // Show a notification about live streams when the page loads 
  // and pick a random stream to show in popup
  useEffect(() => {
    if (activeLiveStreams.length > 0) {
      setTimeout(() => {
        toast({
          title: "Live Streams Available!",
          description: `${activeLiveStreams.length} sellers are currently streaming. Check it out!`,
          duration: 5000,
        });
      }, 1500);
      
      // Set a random live stream for popup
      const randomIndex = Math.floor(Math.random() * activeLiveStreams.length);
      setRandomLiveStream(activeLiveStreams[randomIndex]);
      
      // Show the popup after a delay
      setTimeout(() => {
        setShowLivePopup(true);
      }, 3000);
    }
  }, []);
  
  return (
    <div className="app-container px-4 pb-16">
      {/* Search Bar */}
      <div className="pt-4 pb-2">
        <div 
          className="bg-gray-100 rounded-full p-3 flex items-center"
          onClick={() => navigate('/products')}
        >
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-gray-500">Search products, brands, and more...</span>
        </div>
      </div>
      
      {/* Categories */}
      <div className="py-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Categories</h2>
          <Link to="/products" className="flex items-center text-sm text-primary">
            <span>View all</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {categories.slice(0, 8).map((category, index) => (
            <Link
              to={`/products?category=${category}`}
              key={index}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-1">
                <span className="text-primary text-xl">{category.charAt(0)}</span>
              </div>
              <span className="text-xs text-center">{category}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="py-4">
        <ProductList 
          products={featuredProducts} 
          title="Featured Products" 
        />
      </div>
      
      {/* New Arrivals */}
      <div className="py-4">
        <ProductList 
          products={newArrivals} 
          title="New Arrivals" 
        />
      </div>
      
      {/* Random Live Stream Popup */}
      {showLivePopup && randomLiveStream && (
        <LiveStreamPopup 
          stream={randomLiveStream} 
          onClose={() => setShowLivePopup(false)}
        />
      )}
    </div>
  );
}

export default Index;
