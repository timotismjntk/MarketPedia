
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Notification types
type NotificationType = 
  | 'order-placed'
  | 'order-shipped'
  | 'order-delivered'
  | 'order-cancelled'
  | 'payment-success'
  | 'payment-failed'
  | 'product-approved'
  | 'product-rejected'
  | 'product-submitted'
  | 'promotion-created'
  | 'promotion-approved'
  | 'promotion-rejected'
  | 'system';

// Notification interface
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  link?: string;
  metadata?: Record<string, any>;
  recipient?: string; // Added to specify the recipient
}

// Notification Context Type
interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Sample notifications to populate for demo
  const addSampleNotifications = () => {
    if (user && notifications.length === 0) {
      const now = new Date();
      
      if (user.role === 'buyer') {
        const sampleBuyerNotifications = [
          {
            id: `notif-${Date.now()}-1`,
            type: 'order-shipped' as NotificationType,
            title: 'Your order has been shipped!',
            message: 'Your order #ORD-1234 has been shipped and will arrive in 2-3 days.',
            createdAt: new Date(now.getTime() - 10 * 60000).toISOString(), // 10 mins ago
            read: false,
            link: '/orders/shipped',
          },
          {
            id: `notif-${Date.now()}-2`,
            type: 'payment-success' as NotificationType,
            title: 'Payment successful',
            message: 'Your payment for order #ORD-5678 has been processed successfully.',
            createdAt: new Date(now.getTime() - 5 * 3600000).toISOString(), // 5 hours ago
            read: true,
          }
        ];
        setNotifications(sampleBuyerNotifications);
      } else if (user.role === 'seller') {
        const sampleSellerNotifications = [
          {
            id: `notif-${Date.now()}-1`,
            type: 'order-placed' as NotificationType,
            title: 'New order received',
            message: 'You have received a new order #ORD-8765. Please process it soon.',
            createdAt: new Date(now.getTime() - 30 * 60000).toISOString(), // 30 mins ago
            read: false,
            link: '/seller/orders',
          },
          {
            id: `notif-${Date.now()}-2`,
            type: 'product-approved' as NotificationType,
            title: 'Product approved',
            message: 'Your product "Smart Fitness Tracker" has been approved and is now visible in the marketplace.',
            createdAt: new Date(now.getTime() - 12 * 3600000).toISOString(), // 12 hours ago
            read: false,
            link: '/seller/products',
          }
        ];
        setNotifications(sampleSellerNotifications);
      } else if (user.role === 'admin') {
        const sampleAdminNotifications = [
          {
            id: `notif-${Date.now()}-1`,
            type: 'product-submitted' as NotificationType,
            title: 'New product submitted',
            message: 'A seller has submitted a new product for approval.',
            createdAt: new Date(now.getTime() - 45 * 60000).toISOString(), // 45 mins ago
            read: false,
            link: '/admin/moderation',
          },
          {
            id: `notif-${Date.now()}-2`,
            type: 'system' as NotificationType,
            title: 'System update completed',
            message: 'The scheduled system maintenance has been completed successfully.',
            createdAt: new Date(now.getTime() - 24 * 3600000).toISOString(), // 24 hours ago
            read: true,
          }
        ];
        setNotifications(sampleAdminNotifications);
      }
    }
  };
  
  // Load notifications when user changes
  useEffect(() => {
    if (user) {
      const storageKey = user.role === 'admin' 
        ? 'adminNotifications' 
        : user.role === 'seller'
          ? `${user.id}-notifications`
          : `${user.id}-notifications`;
          
      const savedNotifications = localStorage.getItem(storageKey);
      if (savedNotifications) {
        try {
          setNotifications(JSON.parse(savedNotifications));
        } catch (e) {
          console.error('Failed to parse saved notifications', e);
          setNotifications([]);
          // Add sample notifications if parsing fails
          addSampleNotifications();
        }
      } else {
        setNotifications([]);
        // Add sample notifications for first-time users
        addSampleNotifications();
      }
    } else {
      setNotifications([]);
    }
  }, [user]);
  
  // Save notifications whenever they change
  useEffect(() => {
    if (user) {
      const storageKey = user.role === 'admin' 
        ? 'adminNotifications' 
        : user.role === 'seller'
          ? `${user.id}-notifications`
          : `${user.id}-notifications`;
          
      localStorage.setItem(storageKey, JSON.stringify(notifications));
    }
  }, [notifications, user]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    if (!user) return;
    
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.message,
    });
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(
      n => n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const clearAll = () => {
    setNotifications([]);
  };
  
  return (
    <NotificationsContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll
    }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
