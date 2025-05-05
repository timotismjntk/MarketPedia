
import React, { useEffect } from 'react';
import { ArrowLeft, Package, MessageCircle, Percent, Bell, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();
  
  // Mark notifications as read when the page is viewed
  useEffect(() => {
    if (notifications.length > 0) {
      const unreadNotifications = notifications.filter(n => !n.read);
      if (unreadNotifications.length > 0) {
        unreadNotifications.forEach(n => markAsRead(n.id));
      }
    }
  }, [notifications, markAsRead]);
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'product-approved':
        return <CheckCircle className="text-green-500" />;
      case 'product-rejected':
        return <XCircle className="text-red-500" />;
      case 'order-placed':
        return <Package className="text-blue-500" />;
      case 'message':
        return <MessageCircle className="text-green-500" />;
      case 'promotion-approved':
      case 'promotion-rejected':
        return <Percent className="text-purple-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };
  
  const handleDeleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification(id);
  };
  
  const handleNotificationClick = (notif: any) => {
    // Navigate based on notification type
    if (notif.type === 'product-approved' || notif.type === 'product-rejected') {
      navigate('/seller/products');
    } else if (notif.type === 'order-placed') {
      navigate('/seller/orders');
    } else if (notif.type === 'promotion-approved' || notif.type === 'promotion-rejected') {
      navigate('/seller/promotions');
    }
  };
  
  return (
    <div className="app-container px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/seller')}
            className="p-2 -ml-2 text-gray-600"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold ml-2">Notifications</h1>
        </div>
        {notifications.length > 0 && (
          <button 
            onClick={() => markAllAsRead()} 
            className="text-primary text-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-100'}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{notification.title}</h3>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">
                        {new Date(notification.createdAt).toLocaleString(undefined, {
                          hour: 'numeric',
                          minute: 'numeric',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <button 
                        onClick={(e) => handleDeleteNotification(notification.id, e)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
