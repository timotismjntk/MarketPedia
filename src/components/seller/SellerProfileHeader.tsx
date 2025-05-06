
import React from 'react';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SellerProfileHeaderProps {
  seller: {
    name: string;
    coverImage: string;
    avatar: string;
    rating: number;
    reviews: number;
    products: number;
    followers: number;
    location: string;
    joinedDate: string;
    description: string;
    responseRate: string;
    responseTime: string;
    isLive?: boolean;
  };
  liveStream?: any;
  onChatClick: () => void;
  onWatchLiveClick?: () => void;
}

const SellerProfileHeader: React.FC<SellerProfileHeaderProps> = ({
  seller,
  liveStream,
  onChatClick,
  onWatchLiveClick
}) => {
  const isLive = liveStream || seller.isLive;
  
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-40 bg-gray-200 relative">
        <img 
          src={seller.coverImage} 
          alt={`${seller.name} cover`} 
          className="w-full h-full object-cover"
        />
        
        {isLive && (
          <div className="absolute top-4 left-4">
            <Badge variant="destructive" className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
              LIVE NOW
            </Badge>
          </div>
        )}
      </div>
      
      {/* Profile Info */}
      <div className="px-4">
        <div className="flex items-end -mt-12">
          <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden">
            <img 
              src={seller.avatar} 
              alt={seller.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-auto flex gap-2">
            {isLive && (
              <Button 
                onClick={onWatchLiveClick} 
                className="bg-red-600 hover:bg-red-700"
              >
                <Video className="mr-2 h-4 w-4" />
                Join Live
              </Button>
            )}
            <Button onClick={onChatClick} variant="outline">
              Chat with Seller
            </Button>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{seller.name}</h1>
            <div className="flex items-center">
              <div className="text-yellow-500">★</div>
              <span className="font-medium ml-1">{seller.rating}</span>
              <span className="text-gray-500 ml-1">({seller.reviews} reviews)</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mt-1">
            {seller.location} • Joined {seller.joinedDate}
          </div>
          
          <div className="flex gap-4 mt-3 text-sm">
            <div>
              <span className="font-semibold">{seller.products}</span> Products
            </div>
            <div>
              <span className="font-semibold">{seller.followers}</span> Followers
            </div>
            <div>
              <span className="font-semibold">{seller.responseRate}</span> Response Rate
            </div>
            <div>
              <span className="font-semibold">{seller.responseTime}</span> Response Time
            </div>
          </div>
          
          <p className="mt-3 text-gray-700 text-sm">{seller.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SellerProfileHeader;
