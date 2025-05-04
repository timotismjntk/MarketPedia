
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import AdminNavigation from './AdminNavigation';
import { ChevronLeft, Settings, Bell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminLayout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="app-container flex flex-col min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-gray-600 hover:text-primary">
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Back to App</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/admin/notifications" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center">
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Admin Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/admin/settings/commission')}>
                  Commission Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/settings/moderation')}>
                  Content Moderation
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/settings/system')}>
                  System Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="ml-2 text-sm font-medium hidden sm:block">{user?.name || 'Admin'}</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content - Add padding to ensure content isn't hidden under bottom nav */}
      <div className="flex-1 pb-16">
        <Outlet />
      </div>
      
      {/* Bottom Navigation */}
      <AdminNavigation />
    </div>
  );
};

export default AdminLayout;
