
import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Lock, Globe, CreditCard, Shield, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const AccountSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // State for switches
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricLogin, setBiometricLogin] = useState(false);
  
  const handleSettingChange = (setting: string, value: boolean) => {
    // In a real app, this would update the setting in a database
    toast({
      title: "Setting updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };
  
  return (
    <div className="app-container px-4 pt-4 pb-20">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Account Settings</h1>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <User className="text-gray-500 w-5 h-5 mr-3" />
            <h2 className="font-medium">Personal Information</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1 ml-8">
            Manage your personal information
          </p>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Name</p>
              <p className="text-sm text-gray-500">{user?.name}</p>
            </div>
            <button className="text-sm text-primary">Edit</button>
          </div>
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <button className="text-sm text-primary">Edit</button>
          </div>
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-gray-500">Not set</p>
            </div>
            <button className="text-sm text-primary">Add</button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <Bell className="text-gray-500 w-5 h-5 mr-3" />
            <h2 className="font-medium">Notification Settings</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1 ml-8">
            Manage how you receive notifications
          </p>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications on your device</p>
            </div>
            <Switch 
              checked={pushNotifications}
              onCheckedChange={(value) => {
                setPushNotifications(value);
                handleSettingChange('Push notifications', value);
              }} 
            />
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <Switch 
              checked={emailNotifications}
              onCheckedChange={(value) => {
                setEmailNotifications(value);
                handleSettingChange('Email notifications', value);
              }} 
            />
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Order Updates</p>
              <p className="text-sm text-gray-500">Get notified about your order status</p>
            </div>
            <Switch 
              checked={orderUpdates}
              onCheckedChange={(value) => {
                setOrderUpdates(value);
                handleSettingChange('Order updates', value);
              }} 
            />
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Promotions & Offers</p>
              <p className="text-sm text-gray-500">Get notified about deals and discounts</p>
            </div>
            <Switch 
              checked={promotions}
              onCheckedChange={(value) => {
                setPromotions(value);
                handleSettingChange('Promotions', value);
              }} 
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <Lock className="text-gray-500 w-5 h-5 mr-3" />
            <h2 className="font-medium">Security</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1 ml-8">
            Manage your account security
          </p>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-500">Last changed 3 months ago</p>
            </div>
            <button className="text-sm text-primary">Change</button>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <Switch 
              checked={twoFactorAuth}
              onCheckedChange={(value) => {
                setTwoFactorAuth(value);
                handleSettingChange('Two-factor authentication', value);
              }} 
            />
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Biometric Login</p>
              <p className="text-sm text-gray-500">Use fingerprint or face recognition</p>
            </div>
            <Switch 
              checked={biometricLogin}
              onCheckedChange={(value) => {
                setBiometricLogin(value);
                handleSettingChange('Biometric login', value);
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
