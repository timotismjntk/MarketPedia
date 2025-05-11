
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Tag, MessageCircle, BarChart, Percent, Settings, 
  AlertTriangle, Bell, ShieldAlert, DollarSign, 
  ArrowUp, ArrowRight, ArrowDown 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,289</div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-green-500">
                <ArrowUp className="h-4 w-4 inline" />
                8.2%
              </span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7,845</div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-green-500">
                <ArrowUp className="h-4 w-4 inline" />
                12.5%
              </span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 1,254,320,500</div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-green-500">
                <ArrowUp className="h-4 w-4 inline" />
                15.3%
              </span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Sellers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">428</div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-green-500">
                <ArrowUp className="h-4 w-4 inline" />
                5.8%
              </span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Access */}
      <h2 className="text-lg font-bold mb-4">Admin Functions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* User Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>User Management</CardTitle>
            </div>
            <CardDescription>
              Manage, verify, and moderate user accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Total Users</span>
              <span>5,289</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Pending Verification</span>
              <span className="font-medium text-amber-600">24</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Flagged Accounts</span>
              <span className="font-medium text-red-600">7</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/users">
                <span className="mr-1">Manage Users</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Content Moderation */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <ShieldAlert className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>Content Moderation</CardTitle>
            </div>
            <CardDescription>
              Review and moderate product listings and user content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Reported Content</span>
              <span className="font-medium text-amber-600">18</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Pending Reviews</span>
              <span>42</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Flagged Products</span>
              <span className="font-medium text-red-600">5</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/moderation">
                <span className="mr-1">Moderate Content</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Category Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Tag className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>Category Management</CardTitle>
            </div>
            <CardDescription>
              Organize product categories and structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Total Categories</span>
              <span>32</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Featured Categories</span>
              <span>8</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Empty Categories</span>
              <span>3</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/categories">
                <span className="mr-1">Manage Categories</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Analytics & Reports */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <BarChart className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>Analytics & Reports</CardTitle>
            </div>
            <CardDescription>
              View platform performance metrics and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Monthly Growth</span>
              <span className="font-medium text-green-600">+15.3%</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Conversion Rate</span>
              <span>3.8%</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Avg Order Value</span>
              <span>Rp 160,000</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/reports">
                <span className="mr-1">View Reports</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Global Promotions */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Percent className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>Promotion Management</CardTitle>
            </div>
            <CardDescription>
              Create and manage site-wide promotions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Active Promotions</span>
              <span>3</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Upcoming Promotions</span>
              <span>2</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Expired Promotions</span>
              <span>12</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/promotions">
                <span className="mr-1">Manage Promotions</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Commission Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>Commission Settings</CardTitle>
            </div>
            <CardDescription>
              Configure marketplace commission rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Base Commission Rate</span>
              <span>5.5%</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Custom Category Rates</span>
              <span>7</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Next Review Date</span>
              <span>10 Jun 2025</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/commission">
                <span className="mr-1">Configure Commissions</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* System Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Bell className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>System Notifications</CardTitle>
            </div>
            <CardDescription>
              Send platform-wide announcements to users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Scheduled Notifications</span>
              <span>2</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Draft Notifications</span>
              <span>1</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Sent (This Month)</span>
              <span>5</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/notifications">
                <span className="mr-1">Manage Notifications</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Complaint Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <MessageCircle className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>Complaints & Support</CardTitle>
            </div>
            <CardDescription>
              Handle customer complaints and resolve disputes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Open Complaints</span>
              <span className="font-medium text-amber-600">12</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Urgent Cases</span>
              <span className="font-medium text-red-600">3</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Resolved (This Week)</span>
              <span>17</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/complaints">
                <span className="mr-1">Manage Complaints</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* System Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Settings className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>System Settings</CardTitle>
            </div>
            <CardDescription>
              Configure platform settings and parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Platform Status</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Maintenance Mode</span>
              <span>Off</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Last Config Update</span>
              <span>3 May 2025</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <span className="mr-1">System Settings</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Recent Activities */}
      <h2 className="text-lg font-bold mb-4">Recent Admin Activities</h2>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium">User verification completed</p>
                <p className="text-xs text-gray-500">5 seller accounts were verified today</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Percent className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium">New promotion created</p>
                <p className="text-xs text-gray-500">Payday Sale promotion has been scheduled</p>
                <p className="text-xs text-gray-400">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <AlertTriangle className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Complaint resolved</p>
                <p className="text-xs text-gray-500">Refund processed for order #ORD-58742</p>
                <p className="text-xs text-gray-400">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Tag className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Category structure updated</p>
                <p className="text-xs text-gray-500">Added 3 new subcategories to Electronics</p>
                <p className="text-xs text-gray-400">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
