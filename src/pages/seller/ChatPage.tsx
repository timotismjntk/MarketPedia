
import React, { useState } from 'react';
import { MessageCircle, Search, User, ChevronLeft, Send, Image, Smile } from 'lucide-react';

// Mock data untuk chat
const mockChats = [
  {
    id: '1',
    customer: 'Ahmad Rasyid',
    lastMessage: 'Apakah produk masih tersedia?',
    time: '09:45',
    unread: 2,
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    customer: 'Siti Nuraini',
    lastMessage: 'Saya sudah transfer pembayarannya',
    time: '08:30',
    unread: 0,
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    customer: 'Budi Santoso',
    lastMessage: 'Terima kasih, paketnya sudah sampai',
    time: 'Kemarin',
    unread: 0,
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    customer: 'Dewi Lestari',
    lastMessage: 'Apakah ada warna lain?',
    time: 'Kemarin',
    unread: 1,
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: '5',
    customer: 'Eko Prasetyo',
    lastMessage: 'Barang sudah dikirim kapan ya?',
    time: '23/04',
    unread: 0,
    avatar: 'https://i.pravatar.cc/150?img=5'
  }
];

// Mock pesan untuk conversation tertentu
const mockMessages = [
  {
    id: 'm1',
    sender: 'customer',
    text: 'Halo, apakah produk jam tangan masih tersedia?',
    time: '09:30'
  },
  {
    id: 'm2',
    sender: 'seller',
    text: 'Selamat pagi, iya masih tersedia. Ada yang bisa saya bantu?',
    time: '09:35'
  },
  {
    id: 'm3',
    sender: 'customer',
    text: 'Apakah bisa dikirim hari ini jika saya order sekarang?',
    time: '09:40'
  },
  {
    id: 'm4',
    sender: 'customer',
    text: 'Dan apakah ada diskon untuk pembelian 2 item?',
    time: '09:45'
  }
];

const SellerChatPage = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredChats = mockChats.filter(chat => 
    chat.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    // Dalam aplikasi sebenarnya, ini akan mengirim pesan ke backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="container mx-auto px-0 py-0 h-screen flex flex-col">
      {activeChat ? (
        // Chat detail view
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-white p-4 border-b flex items-center">
            <button 
              className="p-1 mr-3" 
              onClick={() => setActiveChat(null)}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <img 
                  src={mockChats.find(chat => chat.id === activeChat)?.avatar} 
                  alt="Customer" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">
                  {mockChats.find(chat => chat.id === activeChat)?.customer}
                </h3>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {mockMessages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[75%] rounded-lg p-3 
                      ${message.sender === 'seller' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-white border rounded-bl-none'}`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 text-right 
                      ${message.sender === 'seller' ? 'text-white/80' : 'text-gray-500'}`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="bg-white p-3 border-t">
            <div className="flex items-center">
              <button className="p-2 text-gray-500">
                <Image size={20} />
              </button>
              <button className="p-2 text-gray-500">
                <Smile size={20} />
              </button>
              <input
                type="text"
                className="flex-1 border rounded-full px-4 py-2 mx-2 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                className={`p-2 rounded-full ${newMessage.trim() ? 'text-primary' : 'text-gray-400'}`}
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Chat list view
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Pesan Pelanggan</h1>
            
            {/* Search */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                className="pl-10 w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Cari pesan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Chat list */}
            <div className="space-y-2">
              {filteredChats.length > 0 ? (
                filteredChats.map(chat => (
                  <div 
                    key={chat.id}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => setActiveChat(chat.id)}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                        <img 
                          src={chat.avatar} 
                          alt={chat.customer} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      {chat.unread > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">{chat.unread}</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{chat.customer}</h3>
                        <p className="text-xs text-gray-500">{chat.time}</p>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="mx-auto mb-2" size={32} />
                  <p>Tidak ada pesan yang ditemukan</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerChatPage;
