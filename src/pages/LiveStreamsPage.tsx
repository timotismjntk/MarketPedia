
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Clock,
  Video 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockLiveStreams, LiveStream } from '@/lib/mockData';

const LiveStreamsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter livestreams based on search
  const filteredStreams = mockLiveStreams.filter(stream => 
    stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stream.sellerName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group by live now and upcoming
  const liveNow = filteredStreams.filter(stream => stream.isLive);
  const upcoming = filteredStreams.filter(stream => !stream.isLive);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 0) {
      // Future time (for scheduled streams)
      const futureMins = Math.abs(diffMins);
      if (futureMins < 60) return `In ${futureMins}m`;
      return `In ${Math.floor(futureMins / 60)}h`;
    }
    
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${Math.floor(diffMins / 60)}h ago`;
  };

  const handleStreamClick = (stream: LiveStream) => {
    if (stream.isLive) {
      navigate(`/live/${stream.id}`);
    } else {
      // For scheduled streams, navigate to seller's profile
      navigate(`/seller/${stream.sellerId}`);
    }
  };
  
  return (
    <div className="app-container px-4 pt-4 pb-16">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Live Streams</h1>
      </div>
      
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={18} />
        </div>
        <Input
          type="text"
          placeholder="Search for streams or sellers..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {liveNow.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3 flex items-center">
            <Badge variant="destructive" className="mr-2 px-1.5 py-0">LIVE</Badge>
            Streaming Now
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {liveNow.map(stream => (
              <div 
                key={stream.id}
                onClick={() => handleStreamClick(stream)}
                className="cursor-pointer rounded-lg overflow-hidden border hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={stream.thumbnailImage} 
                    alt={stream.title}
                    className="w-full h-48 object-cover"
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
                  <h3 className="font-medium leading-tight">{stream.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {upcoming.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3 flex items-center">
            <Clock size={18} className="mr-2" />
            Upcoming Streams
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcoming.map(stream => (
              <div 
                key={stream.id}
                onClick={() => handleStreamClick(stream)}
                className="cursor-pointer rounded-lg overflow-hidden border hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={stream.thumbnailImage} 
                    alt={stream.title}
                    className="w-full h-48 object-cover grayscale-[30%]"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-500 text-white border-none">
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
                  <h3 className="font-medium leading-tight">{stream.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {filteredStreams.length === 0 && (
        <div className="text-center py-12">
          <Video size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No live streams found</p>
          {searchQuery && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveStreamsPage;
