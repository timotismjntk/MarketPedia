
import React from 'react';
import { ArrowLeft, ShoppingBag, MessageCircle, Percent, Bell, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    title: 'Your order has been shipped!',
    message: 'Your order #ORD-1234 has been shipped and will arrive in 2-3 days.',
    time: '10 mins ago',
    type: 'order',
    read: false
  },
  {
    id: '2',
    title: 'New message from Seller',
    message: 'TechGadgets replied to your question about the Modern Wireless Earbuds.',
    time: '2 hours ago',
    type: 'message',
    read: false
  },
  {
    id: '3',
    title: 'Flash Sale: 50% OFF!',
    message: 'Limited time offer! Get 50% off on selected electronics.',
    time: '5 hours ago',
    type: 'promotion',
    read: true
  },
  {
    id: '4',
    title: 'You earned loyalty points',
    message: 'You earned 120 points from your recent purchase. Check your rewards!',
    time: '1 day ago',
    type: 'reward',
    read: true
  },
  {
    id: '5',
    title: 'Order delivered',
    message: 'Your order #ORD-9876 has been delivered. Please rate your experience!',
    time: '3 days ago',
    type: 'order',
    read: true
  }
];

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="text-blue-500" />;
      case 'message':
        return <MessageCircle className="text-green-500" />;
      case 'promotion':
        return <Percent className="text-red-500" />;
      case 'reward':
        return <Bell className="text-purple-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };
  
  return (
    <div className="app-container px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="p-2 -ml-2 text-gray-600"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold ml-2">Notifications</h1>
        </div>
        <button className="text-primary text-sm font-medium">
          Mark all as read
        </button>
      </div>
      
      <div className="space-y-3">
        {mockNotifications.map((notification) => (
          <div 
            key={notification.id}
            className={`p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-100'}`}
          >
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
