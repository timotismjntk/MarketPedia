
import React, { useState } from 'react';
import { Bell, Send, Users, Tag, Calendar, Search, Edit, Trash, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Notification type definition
interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'system_update' | 'promotion' | 'security' | 'announcement';
  target: 'all' | 'buyers' | 'sellers' | 'new_users';
  status: 'draft' | 'scheduled' | 'sent';
  createdAt: string;
  scheduledFor?: string;
  sentAt?: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Feature: Live Shopping',
    content: 'We\'ve just launched live shopping feature! Now sellers can showcase products in real-time video streams.',
    type: 'system_update',
    target: 'all',
    status: 'sent',
    createdAt: '2025-04-28T10:30:00',
    sentAt: '2025-04-30T09:00:00'
  },
  {
    id: '2',
    title: 'Security Alert: Update Your Password',
    content: 'As part of our security enhancement, we recommend all users to update their passwords.',
    type: 'security',
    target: 'all',
    status: 'sent',
    createdAt: '2025-04-29T14:20:00',
    sentAt: '2025-04-29T15:00:00'
  },
  {
    id: '3',
    title: 'Harbolnas 11.11 Preparation',
    content: 'Get ready for our biggest sale of the year! Submit your products for Harbolnas 11.11 promotion.',
    type: 'promotion',
    target: 'sellers',
    status: 'scheduled',
    createdAt: '2025-05-02T11:15:00',
    scheduledFor: '2025-05-10T08:00:00'
  },
  {
    id: '4',
    title: 'Welcome to Our Marketplace',
    content: 'Thank you for joining our platform! Here are some tips to get you started on your shopping journey.',
    type: 'announcement',
    target: 'new_users',
    status: 'draft',
    createdAt: '2025-05-03T09:45:00'
  }
];

const notificationTypes = [
  { value: 'system_update', label: 'System Update', icon: Bell },
  { value: 'promotion', label: 'Promotion', icon: Tag },
  { value: 'security', label: 'Security', icon: Bell },
  { value: 'announcement', label: 'Announcement', icon: Bell }
];

const targetGroups = [
  { value: 'all', label: 'All Users' },
  { value: 'buyers', label: 'Buyers Only' },
  { value: 'sellers', label: 'Sellers Only' },
  { value: 'new_users', label: 'New Users (< 30 days)' }
];

const AdminNotificationsPage = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationToEdit, setNotificationToEdit] = useState<Notification | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'announcement',
    target: 'all',
    scheduleLater: false,
    scheduleDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: 'announcement',
      target: 'all',
      scheduleLater: false,
      scheduleDate: ''
    });
    setNotificationToEdit(null);
  };

  const handleCreateNotification = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };
  
  const handleEditNotification = (notification: Notification) => {
    setNotificationToEdit(notification);
    setFormData({
      title: notification.title,
      content: notification.content,
      type: notification.type,
      target: notification.target,
      scheduleLater: notification.status === 'scheduled',
      scheduleDate: notification.scheduledFor || ''
    });
    setIsCreateDialogOpen(true);
  };
  
  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been deleted successfully."
    });
  };
  
  const handlePreviewNotification = (notification: Notification) => {
    setNotificationToEdit(notification);
    setIsPreviewDialogOpen(true);
  };
  
  const handleSendNow = (notification: Notification) => {
    setNotifications(notifications.map(notif => 
      notif.id === notification.id
        ? { 
            ...notif, 
            status: 'sent', 
            sentAt: new Date().toISOString(),
            scheduledFor: undefined
          }
        : notif
    ));
    
    toast({
      title: "Notification sent",
      description: `"${notification.title}" has been sent to ${getTargetLabel(notification.target)}.`
    });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const currentDate = new Date().toISOString();
    
    if (notificationToEdit) {
      // Update existing notification
      setNotifications(notifications.map(notif => 
        notif.id === notificationToEdit.id
          ? {
              ...notif,
              title: formData.title,
              content: formData.content,
              type: formData.type as Notification['type'],
              target: formData.target as Notification['target'],
              status: formData.scheduleLater ? 'scheduled' : 'draft',
              scheduledFor: formData.scheduleLater ? formData.scheduleDate : undefined
            }
          : notif
      ));
      
      toast({
        title: "Notification updated",
        description: "The notification has been updated successfully."
      });
    } else {
      // Create new notification
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        type: formData.type as Notification['type'],
        target: formData.target as Notification['target'],
        status: formData.scheduleLater ? 'scheduled' : 'draft',
        createdAt: currentDate,
        scheduledFor: formData.scheduleLater ? formData.scheduleDate : undefined
      };
      
      setNotifications([newNotification, ...notifications]);
      
      toast({
        title: "Notification created",
        description: "The notification has been created successfully."
      });
    }
    
    setIsCreateDialogOpen(false);
    resetForm();
  };
  
  const getTypeLabel = (type: string) => {
    const foundType = notificationTypes.find(t => t.value === type);
    return foundType ? foundType.label : type;
  };
  
  const getTypeIcon = (type: string) => {
    const foundType = notificationTypes.find(t => t.value === type);
    return foundType ? <foundType.icon className="h-4 w-4" /> : <Bell className="h-4 w-4" />;
  };
  
  const getTargetLabel = (target: string) => {
    const foundTarget = targetGroups.find(t => t.value === target);
    return foundTarget ? foundTarget.label : target;
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'sent':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notif => 
    notif.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    notif.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">System Notifications</h1>
        
        <Button 
          onClick={handleCreateNotification} 
          className="mt-4 md:mt-0"
        >
          <Send className="mr-2 h-4 w-4" />
          Create Notification
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Notification Dashboard</CardTitle>
          <CardDescription>
            Create, schedule and manage system notifications for users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="h-4 w-4" />
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {notificationTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <Card key={notification.id} className="overflow-hidden">
                      <div className={`w-1 absolute left-0 top-0 bottom-0 ${
                        notification.type === 'system_update' ? 'bg-blue-500' :
                        notification.type === 'security' ? 'bg-red-500' :
                        notification.type === 'promotion' ? 'bg-green-500' : 'bg-amber-500'
                      }`}></div>
                      
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(notification.status)}`}>
                                {notification.status === 'draft' ? 'Draft' :
                                notification.status === 'scheduled' ? 'Scheduled' : 'Sent'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {notification.status === 'sent' 
                                  ? `Sent on ${new Date(notification.sentAt!).toLocaleDateString()}`
                                  : notification.status === 'scheduled'
                                  ? `Scheduled for ${new Date(notification.scheduledFor!).toLocaleDateString()}`
                                  : `Created on ${new Date(notification.createdAt).toLocaleDateString()}`
                                }
                              </span>
                            </div>
                            <CardTitle className="text-lg">{notification.title}</CardTitle>
                          </div>
                          
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handlePreviewNotification(notification)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleEditNotification(notification)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 h-8 w-8"
                              onClick={() => handleDeleteNotification(notification.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0 pb-4">
                        <p className="line-clamp-2 text-gray-600">{notification.content}</p>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm text-gray-600">
                              {getTypeIcon(notification.type)}
                              <span className="ml-1">{getTypeLabel(notification.type)}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4" />
                              <span className="ml-1">{getTargetLabel(notification.target)}</span>
                            </div>
                          </div>
                          
                          {notification.status !== 'sent' && (
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => handleSendNow(notification)}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send Now
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p className="text-lg font-medium">No notifications found</p>
                    <p className="text-sm">Create a new notification to get started</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="draft">
              {/* Similar layout as 'all' but filtered for drafts */}
              <div className="space-y-4">
                {filteredNotifications.filter(n => n.status === 'draft').length > 0 ? (
                  filteredNotifications
                    .filter(n => n.status === 'draft')
                    .map((notification) => (
                      <Card key={notification.id} className="overflow-hidden">
                        <div className={`w-1 absolute left-0 top-0 bottom-0 ${
                          notification.type === 'system_update' ? 'bg-blue-500' :
                          notification.type === 'security' ? 'bg-red-500' :
                          notification.type === 'promotion' ? 'bg-green-500' : 'bg-amber-500'
                        }`}></div>
                        
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(notification.status)}`}>
                                  Draft
                                </span>
                                <span className="text-xs text-gray-500">
                                  Created on {new Date(notification.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <CardTitle className="text-lg">{notification.title}</CardTitle>
                            </div>
                            
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handlePreviewNotification(notification)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleEditNotification(notification)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-red-600 hover:text-red-800 hover:bg-red-50 h-8 w-8"
                                onClick={() => handleDeleteNotification(notification.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0 pb-4">
                          <p className="line-clamp-2 text-gray-600">{notification.content}</p>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center text-sm text-gray-600">
                                {getTypeIcon(notification.type)}
                                <span className="ml-1">{getTypeLabel(notification.type)}</span>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-600">
                                <Users className="h-4 w-4" />
                                <span className="ml-1">{getTargetLabel(notification.target)}</span>
                              </div>
                            </div>
                            
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => handleSendNow(notification)}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Edit className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No draft notifications found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled">
              {/* Similar layout as 'all' but filtered for scheduled notifications */}
              <div className="space-y-4">
                {filteredNotifications.filter(n => n.status === 'scheduled').length > 0 ? (
                  filteredNotifications
                    .filter(n => n.status === 'scheduled')
                    .map((notification) => (
                      <Card key={notification.id} className="overflow-hidden">
                        <div className={`w-1 absolute left-0 top-0 bottom-0 ${
                          notification.type === 'system_update' ? 'bg-blue-500' :
                          notification.type === 'security' ? 'bg-red-500' :
                          notification.type === 'promotion' ? 'bg-green-500' : 'bg-amber-500'
                        }`}></div>
                        
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(notification.status)}`}>
                                  Scheduled
                                </span>
                                <span className="text-xs text-gray-500">
                                  For {new Date(notification.scheduledFor!).toLocaleDateString()}
                                </span>
                              </div>
                              <CardTitle className="text-lg">{notification.title}</CardTitle>
                            </div>
                            
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handlePreviewNotification(notification)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleEditNotification(notification)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-red-600 hover:text-red-800 hover:bg-red-50 h-8 w-8"
                                onClick={() => handleDeleteNotification(notification.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0 pb-4">
                          <p className="line-clamp-2 text-gray-600">{notification.content}</p>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center text-sm text-gray-600">
                                {getTypeIcon(notification.type)}
                                <span className="ml-1">{getTypeLabel(notification.type)}</span>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-600">
                                <Users className="h-4 w-4" />
                                <span className="ml-1">{getTargetLabel(notification.target)}</span>
                              </div>
                            </div>
                            
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => handleSendNow(notification)}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No scheduled notifications found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="sent">
              {/* Similar layout as 'all' but filtered for sent notifications */}
              <div className="space-y-4">
                {filteredNotifications.filter(n => n.status === 'sent').length > 0 ? (
                  filteredNotifications
                    .filter(n => n.status === 'sent')
                    .map((notification) => (
                      <Card key={notification.id} className="overflow-hidden">
                        <div className={`w-1 absolute left-0 top-0 bottom-0 ${
                          notification.type === 'system_update' ? 'bg-blue-500' :
                          notification.type === 'security' ? 'bg-red-500' :
                          notification.type === 'promotion' ? 'bg-green-500' : 'bg-amber-500'
                        }`}></div>
                        
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(notification.status)}`}>
                                  Sent
                                </span>
                                <span className="text-xs text-gray-500">
                                  On {new Date(notification.sentAt!).toLocaleDateString()}
                                </span>
                              </div>
                              <CardTitle className="text-lg">{notification.title}</CardTitle>
                            </div>
                            
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handlePreviewNotification(notification)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-red-600 hover:text-red-800 hover:bg-red-50 h-8 w-8"
                                onClick={() => handleDeleteNotification(notification.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0 pb-4">
                          <p className="line-clamp-2 text-gray-600">{notification.content}</p>
                          
                          <div className="flex items-center space-x-4 mt-4">
                            <div className="flex items-center text-sm text-gray-600">
                              {getTypeIcon(notification.type)}
                              <span className="ml-1">{getTypeLabel(notification.type)}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4" />
                              <span className="ml-1">{getTargetLabel(notification.target)}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-green-600">
                              <Check className="h-4 w-4" />
                              <span className="ml-1">Delivered</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Send className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No sent notifications found</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Create/Edit Notification Dialog */}
      <Dialog 
        open={isCreateDialogOpen} 
        onOpenChange={(open) => {
          setIsCreateDialogOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {notificationToEdit ? 'Edit Notification' : 'Create New Notification'}
            </DialogTitle>
            <DialogDescription>
              {notificationToEdit 
                ? 'Make changes to this notification before sending or scheduling it.'
                : 'Create a new notification to send to users of the platform.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitForm} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Notification Title*
              </label>
              <Input
                id="title"
                name="title"
                placeholder="E.g., New Feature Release"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Notification Content*
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Enter the message content..."
                className="w-full min-h-[120px] p-3 border rounded-md"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Notification Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full p-2 border rounded-md"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  {notificationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="target" className="text-sm font-medium">
                  Target Audience
                </label>
                <select
                  id="target"
                  name="target"
                  className="w-full p-2 border rounded-md"
                  value={formData.target}
                  onChange={handleInputChange}
                >
                  {targetGroups.map((group) => (
                    <option key={group.value} value={group.value}>
                      {group.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="scheduleLater"
                  name="scheduleLater"
                  checked={formData.scheduleLater}
                  onChange={handleCheckboxChange}
                  className="rounded border-gray-300 mr-2"
                />
                <label htmlFor="scheduleLater" className="text-sm font-medium">
                  Schedule for later
                </label>
              </div>
              
              {formData.scheduleLater && (
                <div className="mt-2">
                  <label htmlFor="scheduleDate" className="text-sm font-medium">
                    Schedule Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    id="scheduleDate"
                    name="scheduleDate"
                    className="w-full p-2 border rounded-md mt-1"
                    value={formData.scheduleDate}
                    onChange={handleInputChange}
                    required={formData.scheduleLater}
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {notificationToEdit ? 'Save Changes' : 'Create Notification'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Preview Notification Dialog */}
      {notificationToEdit && (
        <Dialog 
          open={isPreviewDialogOpen} 
          onOpenChange={setIsPreviewDialogOpen}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preview
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  {getTypeIcon(notificationToEdit.type)}
                  <span className="ml-2 font-medium">{getTypeLabel(notificationToEdit.type)}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{notificationToEdit.title}</h3>
                <p className="text-gray-700">{notificationToEdit.content}</p>
                
                <div className="mt-4 text-sm text-gray-500 flex justify-between">
                  <span>To: {getTargetLabel(notificationToEdit.target)}</span>
                  <span>
                    {notificationToEdit.status === 'sent' 
                      ? `Sent ${new Date(notificationToEdit.sentAt!).toLocaleString()}`
                      : notificationToEdit.status === 'scheduled'
                      ? `Scheduled for ${new Date(notificationToEdit.scheduledFor!).toLocaleString()}`
                      : 'Draft'
                    }
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                This is how the notification will appear to users when delivered.
              </p>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsPreviewDialogOpen(false)}
              >
                Close
              </Button>
              
              {notificationToEdit.status !== 'sent' && (
                <Button
                  variant="default"
                  onClick={() => {
                    handleSendNow(notificationToEdit);
                    setIsPreviewDialogOpen(false);
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Now
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminNotificationsPage;
