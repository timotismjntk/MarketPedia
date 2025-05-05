
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
        }
      } else {
        setNotifications([]);
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
    </NoticationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
