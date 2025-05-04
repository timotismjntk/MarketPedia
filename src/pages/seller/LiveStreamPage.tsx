
import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, MessageSquare, Users, ShoppingBag, Share2, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockProducts } from '@/lib/mockData';

const SellerLiveStreamPage = () => {
  const { toast } = useToast();
  const [isLive, setIsLive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [message, setMessage] = useState('');
  const [isSelectProductsOpen, setIsSelectProductsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Ahmad', message: 'Halo, apakah produk ini tahan lama?', time: '09:32' },
    { id: 2, user: 'Seller', message: 'Halo Ahmad, iya produk ini sangat tahan lama dan berkualitas.', time: '09:33' },
    { id: 3, user: 'Dewi', message: 'Apakah tersedia warna merah?', time: '09:34' },
  ]);

  const toggleLive = () => {
    if (isLive) {
      // End stream
      setIsLive(false);
      toast({
        title: "Live stream ended",
        description: "Your live stream has successfully ended."
      });
    } else {
      // Start stream
      setIsLive(true);
      toast({
        title: "You're now live!",
        description: "Your audience can now see your stream."
      });
    }
  };

  const handleSelectProducts = (product: any) => {
    if (selectedProducts.some(p => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleSaveSelectedProducts = () => {
    setIsSelectProductsOpen(false);
    toast({
      title: "Products updated",
      description: `${selectedProducts.length} products are now featured in your live stream.`
    });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([
        ...chatMessages,
        { 
          id: chatMessages.length + 1, 
          user: 'Seller', 
          message: message.trim(), 
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Live Streaming</h1>
        <Button 
          onClick={toggleLive}
          className={isLive ? "bg-red-600 hover:bg-red-700" : "bg-primary"}
        >
          {isLive ? (
            <>
              <VideoOff size={18} className="mr-2" />
              End Stream
            </>
          ) : (
            <>
              <Video size={18} className="mr-2" />
              Go Live
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                {isLive ? (
                  <>
                    {isVideoOn ? (
                      <div className="w-full h-full bg-black">
                        {/* This would be the actual video stream */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge variant="destructive" className="flex items-center">
                            <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                            LIVE
                          </Badge>
                          <Badge variant="secondary" className="flex items-center">
                            <Users size={14} className="mr-1" />
                            24
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="text-white">
                        <VideoOff size={48} />
                        <p className="mt-2">Camera is off</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-white p-12">
                    <Video size={64} className="mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Siapkan Live Stream Anda</h3>
                    <p className="mb-6 max-w-md mx-auto">
                      Pilih produk yang akan Anda tampilkan dan klik "Go Live" untuk mulai melakukan siaran langsung.
                    </p>
                    <Button onClick={toggleLive}>
                      Go Live
                    </Button>
                  </div>
                )}
              </div>

              {isLive && (
                <div className="p-4 bg-white flex flex-wrap gap-3 items-center justify-between">
                  <div className="flex gap-2">
                    <Button 
                      variant={isVideoOn ? "default" : "outline"}
                      size="icon"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
                    </Button>
                    <Button 
                      variant={!isMuted ? "default" : "outline"}
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {!isMuted ? <Mic size={18} /> : <MicOff size={18} />}
                    </Button>
                    <Button 
                      variant={showChat ? "default" : "outline"}
                      size="icon"
                      onClick={() => setShowChat(!showChat)}
                    >
                      <MessageSquare size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsSelectProductsOpen(true)}
                      className="hidden sm:flex items-center"
                    >
                      <ShoppingBag size={18} className="mr-2" />
                      Products ({selectedProducts.length})
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="hidden sm:flex items-center">
                      <Share2 size={18} className="mr-2" />
                      Share
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={toggleLive}
                    >
                      End Stream
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {isLive && selectedProducts.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Featured Products</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {selectedProducts.map(product => (
                    <div 
                      key={product.id} 
                      className="flex-none w-40 border rounded-lg overflow-hidden"
                    >
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <h4 className="font-medium text-sm truncate">{product.name}</h4>
                        <p className="text-sm text-red-600">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat Section - Shows only when live and chat is enabled */}
        {(showChat || !isLive) && (
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardContent className="p-0 flex flex-col h-[600px]">
                <div className="p-3 border-b font-medium flex items-center justify-between">
                  <span>Live Chat</span>
                  {isLive && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setShowChat(false)}
                      className="lg:hidden"
                    >
                      <X size={18} />
                    </Button>
                  )}
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {isLive ? (
                    chatMessages.map(chat => (
                      <div key={chat.id} className={`flex ${chat.user === 'Seller' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] p-2 rounded-lg ${
                          chat.user === 'Seller' 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100'
                        }`}>
                          {chat.user !== 'Seller' && (
                            <p className="font-medium text-xs">{chat.user}</p>
                          )}
                          <p className="text-sm">{chat.message}</p>
                          <p className="text-xs text-right mt-1 opacity-70">{chat.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      <p>Chat akan tersedia saat Anda memulai siaran langsung</p>
                    </div>
                  )}
                </div>
                
                {isLive && (
                  <div className="p-3 border-t">
                    <div className="flex">
                      <Input
                        placeholder="Ketik pesan..."
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
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Dialog open={isSelectProductsOpen} onOpenChange={setIsSelectProductsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select Products for Live Stream</DialogTitle>
            <DialogDescription>
              Choose products to showcase during your live stream.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4 max-h-[400px] overflow-y-auto">
            {mockProducts.map((product) => (
              <div 
                key={product.id}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedProducts.some(p => p.id === product.id) 
                    ? 'ring-2 ring-primary' 
                    : 'hover:border-primary'
                }`}
                onClick={() => handleSelectProducts(product)}
              >
                <div className="h-32 bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h4 className="text-sm font-medium truncate">{product.name}</h4>
                  <p className="text-sm text-primary">${product.price.toFixed(2)}</p>
                </div>
                {selectedProducts.some(p => p.id === product.id) && (
                  <div className="bg-primary text-white text-xs font-medium p-1 text-center">
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSelectProductsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSelectedProducts}>
              Save Selection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerLiveStreamPage;
