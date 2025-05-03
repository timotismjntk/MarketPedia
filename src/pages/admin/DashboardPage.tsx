
import React from 'react';
import { Users, ShoppingBag, DollarSign, CreditCard } from 'lucide-react';

// Mock admin dashboard data
const adminData = {
  totalUsers: 2456,
  newUsers: 125,
  totalProducts: 1250,
  activeListings: 875,
  totalRevenue: 85420.50,
  transactionsToday: 124,
  pendingDisputes: 7,
  recentTransactions: [
    {
      id: 'tx1',
      user: 'John Doe',
      amount: 159.99,
      date: '2023-05-03',
      status: 'completed'
    },
    {
      id: 'tx2',
      user: 'Jane Smith',
      amount: 49.99,
      date: '2023-05-03',
      status: 'completed'
    },
    {
      id: 'tx3',
      user: 'Mike Johnson',
      amount: 299.99,
      date: '2023-05-03',
      status: 'pending'
    },
    {
      id: 'tx4',
      user: 'Sarah Williams',
      amount: 79.99,
      date: '2023-05-02',
      status: 'completed'
    }
  ]
};

const DashboardPage: React.FC = () => {
  return (
    <div className="app-container px-4 pt-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">May 2023</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center mb-2">
            <Users className="text-blue-500 mr-2" size={18} />
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
          <h3 className="text-xl font-bold">{adminData.totalUsers}</h3>
          <div className="text-xs text-green-500 mt-1">
            +{adminData.newUsers} this week
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center mb-2">
            <ShoppingBag className="text-purple-500 mr-2" size={18} />
            <p className="text-sm text-gray-500">Products</p>
          </div>
          <h3 className="text-xl font-bold">{adminData.totalProducts}</h3>
          <div className="text-xs text-gray-500 mt-1">
            {adminData.activeListings} active listings
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center mb-2">
            <DollarSign className="text-green-500 mr-2" size={18} />
            <p className="text-sm text-gray-500">Total Revenue</p>
          </div>
          <h3 className="text-xl font-bold">${adminData.totalRevenue.toFixed(2)}</h3>
          <div className="text-xs text-gray-500 mt-1">
            Platform earnings
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center mb-2">
            <CreditCard className="text-orange-500 mr-2" size={18} />
            <p className="text-sm text-gray-500">Transactions</p>
          </div>
          <h3 className="text-xl font-bold">{adminData.transactionsToday}</h3>
          <div className="text-xs text-gray-500 mt-1">
            {adminData.pendingDisputes} disputes pending
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Recent Transactions</h2>
          <button className="text-sm text-primary">View All</button>
        </div>
        
        <div className="space-y-3">
          {adminData.recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div>
                <h3 className="font-medium">{tx.user}</h3>
                <p className="text-xs text-gray-500">
                  {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  tx.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                }`}>
                  ${tx.amount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 capitalize">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
        <h2 className="font-bold mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-2 gap-2">
          <button className="p-3 bg-gray-100 rounded-lg text-sm font-medium text-left">
            Manage Users
          </button>
          <button className="p-3 bg-gray-100 rounded-lg text-sm font-medium text-left">
            Review Products
          </button>
          <button className="p-3 bg-gray-100 rounded-lg text-sm font-medium text-left">
            Promotions
          </button>
          <button className="p-3 bg-gray-100 rounded-lg text-sm font-medium text-left">
            Support Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
