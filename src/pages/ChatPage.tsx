
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// Define interfaces for our data
interface ChatItem {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  unread: number;
  isProductChat: boolean;
  productId?: string;
  productName?: string;
  sellerId?: string;
}

interface MessageItem {
  id: string;
  sender: 'user' | 'other';
  text: string;
  time: string;
}

// Mock chat data
const mockChats: ChatItem[] = [
  {
    id: 'chat1',
    name: 'TechGadgets',
    image: '/placeholder.svg',
    lastMessage: 'Yes, the earbuds are waterproof and have a 6-hour battery life.',
    time: '10:30 AM',
    unread: 2,
    isProductChat: true,
    productId: '1',
    productName: 'Modern Wireless Earbuds',
    sellerId: 'seller1'
  },
  {
    id: 'chat2',
    name: 'StyleHub',
    image: '/placeholder.svg',
    lastMessage: 'We have it in Medium size in blue, red and black colors.',
    time: 'Yesterday',
    unread: 0,
    isProductChat: true,
    productId: '3',
    productName: 'Classic Cotton T-Shirt',
    sellerId: 'seller2'
  },
  {
    id: 'chat3',
    name: 'Customer Support',
    image: '/placeholder.svg',
    lastMessage: 'Is there anything else I can help you with?',
    time: 'May 2',
    unread: 0,
    isProductChat: false
  }
];

// Mock messages for a specific chat
const mockMessages: MessageItem[] = [
  {
    id: 'msg1',
    sender: 'user',
    text: 'Hi, I have a question about the Modern Wireless Earbuds.',
    time: '9:30 AM'
  },
  {
    id: 'msg2',
    sender: 'other',
    text: 'Hello! Sure, I would be happy to help. What would you like to know?',
    time: '9:32 AM'
  },
  {
    id: 'msg3',
    sender: 'user',
    text: 'Are they waterproof? And what is the battery life?',
    time: '9:33 AM'
  },
  {
    id: 'msg4',
    sender: 'other',
    text: 'Yes, the earbuds are waterproof with an IPX7 rating, which means they can withstand immersion in water up to 1 meter for 30 minutes.',
    time: '9:35 AM'
  },
  {
    id: 'msg5',
    sender: 'other',
    text: 'As for the battery life, they last up to 6 hours on a single charge, and the charging case provides an additional 24 hours.',
    time: '9:36 AM'
  }
];

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState('');
  const location = useLocation();
  const [chats, setChats] = useState(mockChats);
  
  useEffect(() => {
    // Check if this is a product ID rather than a chat ID
    // In a real app, this would be handled by the API
    const isProductId = id && !mockChats.some(chat => chat.id === id);
    
    if (isProductId) {
      console.log("Creating new chat for product:", id);
      // Create a new chat for this product
      // In a real app, this would check if a chat already exists for this product
    }
  }, [id]);
  
  // If no specific chat is selected, show the chat list
  if (!id) {
    return (
      <div className="app-container px-4 pt-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="p-2 -ml-2 text-gray-600"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold ml-2">Messages</h1>
        </div>
        
        {chats.length > 0 ? (
          <div className="space-y-3">
            {chats.map((chat) => (
              <div 
                key={chat.id}
                className="p-3 rounded-lg border border-gray-100 flex items-center"
                onClick={() => navigate(`/chat/${chat.id}`)}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={chat.image} 
                      alt={chat.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {chat.unread > 0 && (
                    <div className="absolute top-0 right-0 w-5 h-5 bg-primary text-white rounded-full text-xs flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </div>
                
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  
                  {chat.isProductChat && chat.productName && (
                    <div className="text-xs text-primary mb-1">
                      Re: {chat.productName}
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <MessageSquare size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500">No messages yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Start a conversation with a seller from any product page
            </p>
          </div>
        )}
      </div>
    );
  }
  
  // Find the current chat
  const currentChat = chats.find(chat => chat.id === id) || {
    id: 'new',
    name: 'Seller',
    image: '/placeholder.svg',
    lastMessage: '',
    time: 'Now',
    unread: 0,
    isProductChat: true,
    productId: id
  } as ChatItem;
  
  const handleSend = () => {
    if (message.trim()) {
      // Would typically send to API here
      console.log("Sending message:", message);
      setMessage('');
    }
  };
  
  return (
    <div className="app-container pt-4 flex flex-col h-screen">
      {/* Chat Header */}
      <div className="px-4 pb-4 border-b border-gray-100">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/chat')}
            className="p-2 -ml-2 text-gray-600"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="ml-2 flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={currentChat.image} 
                alt={currentChat.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <h2 className="font-medium">{currentChat.name}</h2>
              {currentChat.isProductChat && currentChat.productName ? (
                <p className="text-xs text-primary">Re: {currentChat.productName}</p>
              ) : (
                <p className="text-xs text-gray-500">Usually responds in 10 minutes</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mockMessages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && message.trim()) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
            className={`ml-2 p-3 rounded-full ${
              message.trim() ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
            }`}
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
