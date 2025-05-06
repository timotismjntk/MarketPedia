import React from 'react';
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

function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Only get live streams that are actually live
  const activeLiveStreams = mockLiveStreams.filter(stream => stream.isLive);
  
  // Get featured products (different ways to select featured products)
  const featuredProducts = mockProducts
    .filter(product => product.rating >= 4.5)
    .slice(0, 4);
    
  const newArrivals = [...mockProducts]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
    
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${Math.floor(diffMins / 60)}h ago`;
  };
  
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
      
      {/* Live Streams Section */}
      {activeLiveStreams.length > 0 && (
        <div className="py-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Badge variant="destructive" className="mr-2">LIVE</Badge>
              <h2 className="font-semibold text-lg">Streaming Now</h2>
            </div>
            <Link to="/live" className="flex items-center text-sm text-primary">
              <span>See all</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {activeLiveStreams.map(stream => (
              <div
                key={stream.id}
                className="flex-none w-[280px] rounded-lg overflow-hidden border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/live/${stream.id}`)}
              >
                <div className="relative">
                  <img 
                    src={stream.thumbnailImage}
                    alt={stream.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2 flex space-x-2">
                    <Badge variant="destructive" className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                      LIVE
                    </Badge>
                    <Badge variant="secondary" className="flex items-center">
                      <Users size={14} className="mr-1" />
                      {stream.viewers}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-black/60 text-white border-none">
                      {formatTimeAgo(stream.startedAt)}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                      <img 
                        src={stream.sellerAvatar}
                        alt={stream.sellerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-sm">{stream.sellerName}</span>
                  </div>
                  <h3 className="font-medium">{stream.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
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
      
      {/* CTA for Seller */}
      {!user?.role || user?.role === 'buyer' ? (
        <div className="py-4 my-4 bg-gradient-to-r from-primary to-purple-700 rounded-lg text-white p-5 text-center">
          <h2 className="text-xl font-bold mb-2">Start Selling Today!</h2>
          <p className="mb-4">Join thousands of sellers and reach millions of customers.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button 
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/auth')}
            >
              Create Seller Account
            </Button>
            <Button 
              variant="default"
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => navigate('/live')}
            >
              <Video size={18} className="mr-2" />
              Watch Live Streams
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Index;
