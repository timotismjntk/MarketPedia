
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Edit, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('activity');

  const handleLogout = () => {
    logout();
  };
  
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Please log in to view your profile</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Profile Header */}
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-4 border-white shadow-md">
            <AvatarImage src={user.avatar || ''} alt={user.name} />
            <AvatarFallback className="bg-primary text-white text-xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile/edit">
                  <Edit className="mr-1 h-4 w-4" /> Edit Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Jakarta, Indonesia</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Phone className="h-4 w-4 mr-1" />
            <span>{user.phone || 'Phone not added'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="h-4 w-4 mr-1" />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <Card className="hover:border-primary cursor-pointer transition-all">
          <Link to="/orders">
            <CardContent className="p-3 flex flex-col items-center">
              <ShoppingBag className="h-6 w-6 text-primary mb-1" />
              <span className="text-sm">Orders</span>
            </CardContent>
          </Link>
        </Card>
        <Card className="hover:border-primary cursor-pointer transition-all">
          <Link to="/wishlist">
            <CardContent className="p-3 flex flex-col items-center">
              <Heart className="h-6 w-6 text-primary mb-1" />
              <span className="text-sm">Wishlist</span>
            </CardContent>
          </Link>
        </Card>
        <Card className="hover:border-primary cursor-pointer transition-all">
          <Link to="/settings">
            <CardContent className="p-3 flex flex-col items-center">
              <Settings className="h-6 w-6 text-primary mb-1" />
              <span className="text-sm">Settings</span>
            </CardContent>
          </Link>
        </Card>
        <Card className="hover:border-primary cursor-pointer transition-all" onClick={handleLogout}>
          <CardContent className="p-3 flex flex-col items-center">
            <LogOut className="h-6 w-6 text-primary mb-1" />
            <span className="text-sm">Logout</span>
          </CardContent>
        </Card>
      </div>
      
      {/* User Content */}
      <div className="mb-20">
        {/* Content tabs will go here */}
        <div className="flex border-b mb-4 overflow-x-auto">
          <button
            className={`px-4 py-2 ${
              activeTab === 'activity' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'reviews' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
        
        {/* Tab content */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <User size={32} className="mx-auto text-gray-300 mb-2" />
              <p>No recent activity to show</p>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <User size={32} className="mx-auto text-gray-300 mb-2" />
              <p>No reviews yet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
