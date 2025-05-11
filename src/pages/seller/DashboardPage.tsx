
import React from 'react';
import { BarChart, DollarSign, ShoppingBag, Star, ArrowUpRight, Package, TrendingUp } from 'lucide-react';

// Mock dashboard data
const dashboardData = {
  totalSales: 5250.75,
  totalOrders: 48,
  averageRating: 4.8,
  pendingOrders: 5,
  revenue: {
    current: 5250.75,
    previous: 4120.50,
    change: 27.4
  },
  topProducts: [
    {
      id: '1',
      name: 'Modern Wireless Earbuds',
      sold: 24,
      revenue: 1439.76
    },
    {
      id: '3',
      name: 'Smart Home Speaker',
      sold: 16,
      revenue: 2079.84
    },
    {
      id: '6',
      name: 'Ergonomic Office Chair',
      sold: 8,
      revenue: 1599.92
    }
  ]
};

const DashboardPage: React.FC = () => {
  return (
    <div className="app-container px-4 pt-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Seller Dashboard</h1>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center mb-2">
            <DollarSign className="text-green-500 mr-2" size={18} />
            <p className="text-sm text-gray-500">Total Sales</p>
          </div>
          <h3 className="text-xl font-bold">${dashboardData.totalSales.toFixed(2)}</h3>
          <div className="text-xs text-green-500 flex items-center mt-1">
            <ArrowUpRight size={12} className="mr-1" />
            {dashboardData.revenue.change}% from last month
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center mb-2">
            <ShoppingBag className="text-blue-500 mr-2" size={18} />
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>
          <h3 className="text-xl font-bold">{dashboardData.totalOrders}</h3>
          <div className="text-xs text-gray-500 mt-1">
            {dashboardData.pendingOrders} pending orders
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center mb-2">
            <Star className="text-yellow-500 mr-2" size={18} />
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
          <h3 className="text-xl font-bold">{dashboardData.averageRating}</h3>
          <div className="text-xs text-gray-500 mt-1">
            Based on 120 reviews
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center mb-2">
            <Package className="text-purple-500 mr-2" size={18} />
            <p className="text-sm text-gray-500">Products</p>
          </div>
          <h3 className="text-xl font-bold">12</h3>
          <div className="text-xs text-gray-500 mt-1">
            3 low in stock
          </div>
        </div>
      </div>
      
      {/* Revenue Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Revenue</h2>
          <div className="text-sm text-gray-500">Last 7 days</div>
        </div>
        
        <div className="h-40 flex items-end justify-between">
          {/* Mock chart bars - in a real app, use a charting library */}
          <div className="flex flex-col items-center w-1/7">
            <div className="bg-primary/10 w-8 rounded-t-sm" style={{ height: '60%' }}></div>
            <span className="text-xs mt-1">Mon</span>
          </div>
          <div className="flex flex-col items-center w-1/7">
            <div className="bg-primary/10 w-8 rounded-t-sm" style={{ height: '45%' }}></div>
            <span className="text-xs mt-1">Tue</span>
          </div>
          <div className="flex flex-col items-center w-1/7">
            <div className="bg-primary/10 w-8 rounded-t-sm" style={{ height: '80%' }}></div>
            <span className="text-xs mt-1">Wed</span>
          </div>
          <div className="flex flex-col items-center w-1/7">
            <div className="bg-primary/10 w-8 rounded-t-sm" style={{ height: '65%' }}></div>
            <span className="text-xs mt-1">Thu</span>
          </div>
          <div className="flex flex-col items-center w-1/7">
            <div className="bg-primary w-8 rounded-t-sm" style={{ height: '90%' }}></div>
            <span className="text-xs mt-1">Fri</span>
          </div>
          <div className="flex flex-col items-center w-1/7">
            <div className="bg-primary/10 w-8 rounded-t-sm" style={{ height: '75%' }}></div>
            <span className="text-xs mt-1">Sat</span>
          </div>
          <div className="flex flex-col items-center w-1/7">
            <div className="bg-primary/10 w-8 rounded-t-sm" style={{ height: '50%' }}></div>
            <span className="text-xs mt-1">Sun</span>
          </div>
        </div>
      </div>
      
      {/* Top Products */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Top Products</h2>
          <button className="text-sm text-primary">View All</button>
        </div>
        
        <div className="space-y-3">
          {dashboardData.topProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.sold} sold</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${product.revenue.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
