
import React, { useState } from 'react';
import { ArrowLeft, Lock, Bell, Shield, CreditCard, Languages, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

type SettingSection = {
  title: string;
  options: {
    label: string;
    value: boolean;
  }[];
};

const AccountSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Define different setting sections
  const [securitySettings, setSecuritySettings] = useState<SettingSection>({
    title: "Security",
    options: [
      { label: "Enable two-factor authentication", value: false },
      { label: "Require password when changing settings", value: true },
      { label: "Biometric login (if available)", value: false }
    ]
  });
  
  const [notificationSettings, setNotificationSettings] = useState<SettingSection>({
    title: "Notifications",
    options: [
      { label: "Order status updates", value: true },
      { label: "Promotional emails", value: false },
      { label: "Discounts and sales", value: true },
      { label: "New product releases", value: false }
    ]
  });

  const [privacySettings, setPrivacySettings] = useState<SettingSection>({
    title: "Privacy",
    options: [
      { label: "Make profile visible to other users", value: true },
      { label: "Allow search engines to index profile", value: false },
      { label: "Share purchase history with sellers", value: false }
    ]
  });
  
  const [paymentSettings, setPaymentSettings] = useState<SettingSection>({
    title: "Payment",
    options: [
      { label: "Save payment information", value: true },
      { label: "Enable one-click checkout", value: false },
      { label: "Receive payment receipts by email", value: true }
    ]
  });
  
  // Function to toggle settings
  const toggleSetting = (section: string, index: number) => {
    if (section === "security") {
      setSecuritySettings({
        ...securitySettings,
        options: securitySettings.options.map((option, i) => 
          i === index ? { ...option, value: !option.value } : option
        )
      });
    } else if (section === "notifications") {
      setNotificationSettings({
        ...notificationSettings,
        options: notificationSettings.options.map((option, i) => 
          i === index ? { ...option, value: !option.value } : option
        )
      });
    } else if (section === "privacy") {
      setPrivacySettings({
        ...privacySettings,
        options: privacySettings.options.map((option, i) => 
          i === index ? { ...option, value: !option.value } : option
        )
      });
    } else if (section === "payment") {
      setPaymentSettings({
        ...paymentSettings,
        options: paymentSettings.options.map((option, i) => 
          i === index ? { ...option, value: !option.value } : option
        )
      });
    }
  };
  
  const saveSettings = () => {
    // In a real app, this would send the settings to an API
    // For now, just show a success message
    toast({
      title: "Settings saved",
      description: "Your account settings have been updated successfully.",
    });
  };
  
  return (
    <div className="app-container px-4 pt-4 pb-16">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Account Settings</h1>
      </div>
      
      {/* Security Section */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Lock size={20} className="text-primary mr-2" />
          <h2 className="text-lg font-medium">{securitySettings.title}</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          {securitySettings.options.map((option, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
              <span>{option.label}</span>
              <Switch 
                checked={option.value} 
                onCheckedChange={() => toggleSetting("security", index)} 
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Notification Settings */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Bell size={20} className="text-primary mr-2" />
          <h2 className="text-lg font-medium">{notificationSettings.title}</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          {notificationSettings.options.map((option, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
              <span>{option.label}</span>
              <Switch 
                checked={option.value} 
                onCheckedChange={() => toggleSetting("notifications", index)} 
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Privacy Settings */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Shield size={20} className="text-primary mr-2" />
          <h2 className="text-lg font-medium">{privacySettings.title}</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          {privacySettings.options.map((option, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
              <span>{option.label}</span>
              <Switch 
                checked={option.value} 
                onCheckedChange={() => toggleSetting("privacy", index)} 
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Payment Settings */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <CreditCard size={20} className="text-primary mr-2" />
          <h2 className="text-lg font-medium">{paymentSettings.title}</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          {paymentSettings.options.map((option, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
              <span>{option.label}</span>
              <Switch 
                checked={option.value} 
                onCheckedChange={() => toggleSetting("payment", index)} 
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional Settings Options */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div 
          className="flex justify-between items-center p-4 border-b cursor-pointer"
          onClick={() => toast({ title: "Language selection", description: "This feature is coming soon." })}
        >
          <div className="flex items-center">
            <Languages size={20} className="text-gray-500 mr-3" />
            <span>Language</span>
          </div>
          <span className="text-gray-400">English</span>
        </div>
        
        <div 
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toast({ title: "Help center", description: "Opening help center..." })}
        >
          <div className="flex items-center">
            <HelpCircle size={20} className="text-gray-500 mr-3" />
            <span>Help Center</span>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
        <Button 
          className="w-full bg-primary text-white" 
          onClick={saveSettings}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
