
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  MessageSquare,
  Video, 
  Plus, 
  Star,
  Bell,
  Percent
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, badge }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center px-4 py-3 ${
        isActive 
          ? 'bg-primary text-white' 
          : 'hover:bg-gray-100'
      }`}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <div className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge > 9 ? '9+' : badge}
        </div>
      )}
    </Link>
  );
};

const SellerNavigation: React.FC = () => {
  const { unreadCount } = useNotifications();
  
  return (
    <nav className="h-full flex flex-col bg-white border-r">
      <div className="p-4 border-b">
        <h1 className="text-lg font-semibold">Seller Dashboard</h1>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="py-2">
          <NavLink 
            to="/seller" 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
          />
          <NavLink 
            to="/seller/products" 
            icon={<Package size={18} />} 
            label="Products" 
          />
          <NavLink 
            to="/seller/orders" 
            icon={<ClipboardList size={18} />} 
            label="Orders" 
          />
          <NavLink 
            to="/seller/promotions" 
            icon={<Percent size={18} />} 
            label="Promotions" 
          />
          <NavLink 
            to="/seller/reviews" 
            icon={<Star size={18} />} 
            label="Reviews" 
          />
          <NavLink 
            to="/seller/chat" 
            icon={<MessageSquare size={18} />} 
            label="Chat" 
          />
          <NavLink 
            to="/seller/notifications" 
            icon={<Bell size={18} />} 
            label="Notifications" 
            badge={unreadCount}
          />
          <NavLink 
            to="/seller/live" 
            icon={<Video size={18} />} 
            label="Live" 
          />
        </div>
      </div>
      
      <div className="p-4 border-t">
        <Link 
          to="/seller/upload"
          className="flex items-center justify-center bg-primary text-white py-2 rounded-lg"
        >
          <Plus size={18} className="mr-2" />
          <span>Add Product</span>
        </Link>
      </div>
    </nav>
  );
};

export default SellerNavigation;
