
import React from 'react';
import { Star, MapPin, Clock, MessageSquare, ShoppingBag, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SellerProfileHeaderProps {
  seller: {
    id: string;
    name: string;
    description: string;
    avatar: string;
    coverImage: string;
    rating: number;
    reviews: number;
    location: string;
    joinedDate: string;
    responseRate: string;
    responseTime: string;
    products: number;
  };
  liveStream?: {
    id: string;
  } | null;
  onChatClick: () => void;
}

const SellerProfileHeader: React.FC<SellerProfileHeaderProps> = ({
  seller,
  liveStream,
  onChatClick
}) => {
  const navigate = useNavigate();
  
  return (
    <>
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
              <div className="flex flex-col sm:flex-row gap-2">
                {liveStream && (
                  <Button 
                    onClick={() => navigate(`/live/${liveStream.id}`)}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Video size={18} />
                    Watch Live
                  </Button>
                )}
                <Button 
                  onClick={onChatClick}
                  className="flex items-center gap-2"
                >
                  <MessageSquare size={18} />
                  Chat with Seller
                </Button>
              </div>
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
    </>
  );
};

export default SellerProfileHeader;
