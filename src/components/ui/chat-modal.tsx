
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

interface ChatModalProps {
  productId: string;
  sellerName: string;
  sellerAvatar?: string;
}

const ChatModal: React.FC<ChatModalProps> = ({ productId, sellerName, sellerAvatar }) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleSendMessage = () => {
    // In a real app, this would send the message to the API
    console.log('Sending message to seller:', message);
    
    // Navigate to the chat page with this seller
    navigate(`/chat/${productId}`);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSendMessage();
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 w-full"
        >
          <MessageSquare size={16} />
          Chat with Seller
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[70vh] p-0 rounded-t-xl">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <img 
                  src={sellerAvatar || "/placeholder.svg"} 
                  alt={sellerName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </Avatar>
              <SheetTitle>{sellerName}</SheetTitle>
            </div>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto p-4 h-[calc(70vh-132px)] bg-gray-50">
          <div className="flex justify-center py-6">
            <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-500">
              Start chatting with {sellerName}
            </div>
          </div>
        </div>
        
        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${sellerName} about this product...`}
              className="resize-none"
              rows={2}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="self-end"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatModal;
