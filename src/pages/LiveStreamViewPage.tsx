
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  MessageSquare,
  ShoppingBag,
  Share2,
  X,
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { mockLiveStreams, mockProducts } from '@/lib/mockData';
import { useAuth } from '@/hooks/useAuth';

const LiveStreamViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stream, setStream] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [message, setMessage] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Ahmad', message: 'Halo, produknya bagus ya', time: '09:32' },
    { id: 2, user: 'TechGadgets', message: 'Halo Ahmad, terima kasih sudah bergabung!', time: '09:33', isSeller: true },
    { id: 3, user: 'Dewi', message: 'Apakah earbuds ini tahan air?', time: '09:34' },
    { id: 4, user: 'TechGadgets', message: 'Iya Dewi, earbuds ini memiliki IP67 waterproof rating', time: '09:35', isSeller: true },
  ]);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const foundStream = mockLiveStreams.find(s => s.id === id);
      setStream(foundStream || null);
      
      if (foundStream) {
        // Get featured products
        const products = mockProducts.filter(p => 
          foundStream.featuredProducts.includes(p.id)
        );
        setFeaturedProducts(products);
      }
      
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Auto scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Add a simulated chat message every 15 seconds
  useEffect(() => {
    if (!stream) return;
    
    const simulatedMessages = [
      { user: 'Reza', message: 'Apakah ada warna lain?' },
      { user: 'Siti', message: 'Dapatkah anda menunjukkan fitur noise cancellation?' },
      { user: 'Arief', message: 'Berapa lama masa garansinya?' },
      { user: 'Lia', message: 'Apakah bisa dipakai untuk olahraga?' },
      { user: 'Budi', message: 'Tolong jelaskan lebih detail tentang baterai!' },
    ];
    
    const interval = setInterval(() => {
      const randomMessage = simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)];
      
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          user: randomMessage.user,
          message: randomMessage.message,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      
      // Randomly add a seller response after a short delay
      if (Math.random() > 0.4) {
        const sellerResponses = [
          `Terima kasih ${randomMessage.user} atas pertanyaannya!`,
          `Baik ${randomMessage.user}, akan saya jelaskan.`,
          `${randomMessage.user}, ya tentu saja bisa!`,
          `Untuk ${randomMessage.user}, produk ini tersedia dalam 3 warna.`,
          `${randomMessage.user}, garansi produk ini 1 tahun.`
        ];
        
        setTimeout(() => {
          setChatMessages(prev => [
            ...prev,
            {
              id: Date.now() + 1,
              user: stream.sellerName,
              message: sellerResponses[Math.floor(Math.random() * sellerResponses.length)],
              time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
              isSeller: true
            }
          ]);
        }, 2000);
      }
      
    }, 15000); // Add a new message every 15 seconds
    
    return () => clearInterval(interval);
  }, [stream]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages([
      ...chatMessages,
      {
        id: Date.now(),
        user: user?.name || 'Guest',
        message: message.trim(),
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    
    setMessage('');
    
    // Simulate seller response after a delay
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          user: stream?.sellerName,
          message: `Terima kasih atas pertanyaannya! ${message.includes('?') ? 'Akan saya jawab.' : 'Ada yang bisa saya bantu?'}`,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          isSeller: true
        }
      ]);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="app-container pt-4 flex flex-col items-center justify-center h-48">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading live stream...</p>
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="app-container px-4 pt-4 pb-16">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-gray-600"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold ml-2">Live Stream</h1>
        </div>
        
        <div className="text-center py-16">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Stream Not Found</h2>
          <p className="text-gray-500 mb-6">The live stream you're looking for doesn't exist or has ended.</p>
          <Button onClick={() => navigate('/live')} variant="outline">
            Browse Live Streams
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container px-4 pt-4 pb-16">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-gray-600"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold ml-2 truncate">{stream.title}</h1>
        </div>
        
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-600"
            onClick={() => navigate(`/seller/${stream.sellerId}`)}
          >
            <ExternalLink size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-600"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare size={20} />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Video Stream */}
        <div className="lg:col-span-2">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <div className="aspect-video">
              <img 
                src={stream.thumbnailImage} 
                alt={stream.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay elements */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="destructive" className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                LIVE
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                <Users size={14} className="mr-1" />
                {stream.viewers}
              </Badge>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-2">
                  <img 
                    src={stream.sellerAvatar} 
                    alt={stream.sellerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-white">{stream.sellerName}</h3>
                  <p className="text-xs text-gray-200">
                    Started {new Date(stream.startedAt).toLocaleTimeString(undefined, {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                
                <div className="ml-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white bg-transparent hover:bg-white/20 hover:text-white"
                  >
                    <Share2 size={16} className="mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured Products */}
          {featuredProducts.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Featured Products</h3>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-primary"
                  onClick={() => navigate(`/seller/${stream.sellerId}`)}
                >
                  View All
                </Button>
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                {featuredProducts.map(product => (
                  <div 
                    key={product.id}
                    className="flex-none w-36 border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="h-36 bg-gray-100 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                      <p className="text-sm text-primary font-medium">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Chat */}
        {showChat && (
          <div className="lg:col-span-1 h-[500px] lg:h-auto">
            <Card className="h-full flex flex-col overflow-hidden">
              <div className="p-3 border-b font-medium flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare size={18} className="mr-2" />
                  <span>Live Chat</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 lg:hidden"
                  onClick={() => setShowChat(false)}
                >
                  <X size={16} />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {chatMessages.map(chat => (
                  <div key={chat.id}>
                    <div className="flex">
                      <div className={`max-w-[85%] p-2 rounded-lg ${
                        chat.isSeller 
                          ? 'bg-primary text-white ml-auto' 
                          : 'bg-gray-100'
                      }`}>
                        <p className="font-medium text-xs">{chat.user}</p>
                        <p className="text-sm">{chat.message}</p>
                        <p className="text-xs text-right mt-1 opacity-70">{chat.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              
              <div className="p-3 border-t">
                <div className="flex">
                  <Input
                    placeholder="Ask a question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="rounded-r-none"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="rounded-l-none"
                    disabled={!message.trim()}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveStreamViewPage;
