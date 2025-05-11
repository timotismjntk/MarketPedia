
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
