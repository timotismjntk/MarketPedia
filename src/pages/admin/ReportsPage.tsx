
import React, { useState } from 'react';
import { Calendar, BarChart, LineChart, ArrowRight, Download, Users, ShoppingBag, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for charts
const mockRevenueData = [
  { month: 'Jan', revenue: 32000 },
  { month: 'Feb', revenue: 45000 },
  { month: 'Mar', revenue: 38000 },
  { month: 'Apr', revenue: 52000 },
  { month: 'May', revenue: 61000 },
  { month: 'Jun', revenue: 72000 },
  { month: 'Jul', revenue: 69000 },
  { month: 'Aug', revenue: 78000 },
  { month: 'Sep', revenue: 92000 },
  { month: 'Oct', revenue: 84000 },
  { month: 'Nov', revenue: 110000 },
  { month: 'Dec', revenue: 132000 },
];

const mockCategoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Fashion', value: 28 },
  { name: 'Home', value: 15 },
  { name: 'Beauty', value: 12 },
  { name: 'Sports', value: 5 },
  { name: 'Books', value: 3 },
  { name: 'Toys', value: 2 },
];

const mockUserGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1450 },
  { month: 'Mar', users: 1680 },
  { month: 'Apr', users: 1920 },
  { month: 'May', users: 2250 },
  { month: 'Jun', users: 2580 },
  { month: 'Jul', users: 2780 },
  { month: 'Aug', users: 3150 },
  { month: 'Sep', users: 3580 },
  { month: 'Oct', users: 4120 },
  { month: 'Nov', users: 4680 },
  { month: 'Dec', users: 5200 },
];

const AdminReportsPage = () => {
  const [timeRange, setTimeRange] = useState('yearly');
  
  // Calculate summary statistics
  const totalRevenue = mockRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = 7845; // Mock data
  const totalUsers = 5200; // Mock data
  const avgOrderValue = Math.round(totalRevenue / totalOrders);
  
  const userGrowth = ((mockUserGrowthData[mockUserGrowthData.length - 1].users - mockUserGrowthData[0].users) / mockUserGrowthData[0].users * 100).toFixed(1);
  const revenueGrowth = ((mockRevenueData[mockRevenueData.length - 1].revenue - mockRevenueData[0].revenue) / mockRevenueData[0].revenue * 100).toFixed(1);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Analytics & Reports</h1>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="quarterly">This Quarter</SelectItem>
              <SelectItem value="yearly">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {totalRevenue.toLocaleString()}</div>
            <div className="flex items-center mt-1 text-sm">
              <span className={revenueGrowth.startsWith('-') ? 'text-red-500' : 'text-green-500'}>
                {revenueGrowth.startsWith('-') ? <ArrowDown className="h-4 w-4 inline" /> : <ArrowUp className="h-4 w-4 inline" />}
                {revenueGrowth}%
              </span>
              <span className="text-gray-500 ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-green-500">
                <ArrowUp className="h-4 w-4 inline" />
                12.3%
              </span>
              <span className="text-gray-500 ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-green-500">
                <ArrowUp className="h-4 w-4 inline" />
                {userGrowth}%
              </span>
              <span className="text-gray-500 ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {avgOrderValue.toLocaleString()}</div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-green-500">
                <ArrowUp className="h-4 w-4 inline" />
                5.2%
              </span>
              <span className="text-gray-500 ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="sales" className="mb-8">
        <TabsList>
          <TabsTrigger value="sales">Sales & Revenue</TabsTrigger>
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Overview of sales performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full flex items-center justify-center text-center">
                  <BarChart className="h-12 w-12 text-gray-300" />
                  <div className="ml-4 text-left">
                    <p className="text-lg font-medium">Revenue Chart</p>
                    <p className="text-sm text-gray-500">Connect a data visualization library for interactive charts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex flex-col justify-between">
                  {mockCategoryData.map((category) => (
                    <div key={category.name} className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{category.name}</span>
                        <span className="text-sm font-medium">{category.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${category.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Monthly active users over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full flex items-center justify-center text-center">
                  <LineChart className="h-12 w-12 text-gray-300" />
                  <div className="ml-4 text-left">
                    <p className="text-lg font-medium">User Growth Chart</p>
                    <p className="text-sm text-gray-500">Connect a data visualization library for interactive charts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
                <CardDescription>Key user metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">New Users</span>
                      <span className="text-sm font-medium">1,248</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: '65%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Active Users</span>
                      <span className="text-sm font-medium">3,872</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: '82%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Returning Users</span>
                      <span className="text-sm font-medium">2,546</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: '58%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Conversion Rate</span>
                      <span className="text-sm font-medium">12.8%</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: '12.8%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Best performing items by sales volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Smart Wireless Earbuds', sales: 842, revenue: 50520 },
                    { name: 'Premium Cotton T-Shirt', sales: 654, revenue: 13080 },
                    { name: 'Smart Home Speaker', sales: 542, revenue: 70460 },
                    { name: 'Fitness Tracker Watch', sales: 482, revenue: 38560 },
                    { name: 'Organic Face Cream', sales: 375, revenue: 9375 },
                  ].map((product, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                          {i + 1}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.sales} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Rp {product.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-center">
                <Button variant="outline">
                  View All Products
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Product Status Overview</CardTitle>
                <CardDescription>Inventory and catalog health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="text-2xl font-bold">1,258</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-500">Out of Stock</p>
                    <p className="text-2xl font-bold text-amber-500">48</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-500">Low Stock</p>
                    <p className="text-2xl font-bold text-orange-500">124</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-500">New Products</p>
                    <p className="text-2xl font-bold text-green-500">86</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Product Categories</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Electronics', count: 324 },
                      { name: 'Fashion', count: 412 },
                      { name: 'Home', count: 187 },
                      { name: 'Beauty', count: 154 },
                      { name: 'Others', count: 181 },
                    ].map((category) => (
                      <div key={category.name} className="flex justify-between items-center">
                        <span className="text-sm">{category.name}</span>
                        <span className="text-sm font-medium">{category.count} products</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReportsPage;
