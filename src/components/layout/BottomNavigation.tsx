
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  Video,
  Heart, 
  User
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { items } = useCart();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  const handleNavClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-2 py-1 shadow-lg z-40">
      <div className="flex justify-around items-center">
        <button
          className={`p-2 flex flex-col items-center ${
            isActive('/') ? 'text-primary' : 'text-gray-500'
          }`}
          onClick={() => handleNavClick('/')}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button
          className={`p-2 flex flex-col items-center ${
            isActive('/live') ? 'text-primary' : 'text-gray-500'
          } relative`}
          onClick={() => handleNavClick('/live')}
        >
          <Video size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-xs mt-1">Live</span>
        </button>
        
        <button
          className={`p-2 flex flex-col items-center ${
            isActive('/cart') ? 'text-primary' : 'text-gray-500'
          } relative`}
          onClick={() => handleNavClick('/cart')}
        >
          <ShoppingCart size={20} />
          {items.length > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
              {items.length}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </button>
        
        <button
          className={`p-2 flex flex-col items-center ${
            isActive('/wishlist') ? 'text-primary' : 'text-gray-500'
          }`}
          onClick={() => handleNavClick('/wishlist')}
        >
          <Heart size={20} />
          <span className="text-xs mt-1">Wishlist</span>
        </button>
        
        {user ? (
          <button
            className={`p-2 flex flex-col items-center ${
              isActive('/profile') || isActive('/orders') ? 'text-primary' : 'text-gray-500'
            }`}
            onClick={() => handleNavClick('/profile')}
          >
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        ) : (
          <button
            className="p-2 flex flex-col items-center text-gray-500"
            onClick={() => handleNavClick('/auth')}
          >
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BottomNavigation;
