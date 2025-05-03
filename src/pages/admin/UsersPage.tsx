
import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, MoreVertical, UserCheck, UserX, Edit, Trash } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data untuk daftar pengguna
const mockUsers = [
  {
    id: '1',
    name: 'Andi Wijaya',
    email: 'andi@example.com',
    role: 'buyer',
    status: 'active',
    joinDate: '15 Apr 2025',
    orders: 12,
    verified: true,
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '2',
    name: 'Budi Setiawan',
    email: 'budi@example.com',
    role: 'buyer',
    status: 'active',
    joinDate: '03 Mar 2025',
    orders: 5,
    verified: true,
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: '3',
    name: 'Citra Dewi',
    email: 'citra@example.com',
    role: 'seller',
    status: 'active',
    joinDate: '21 Feb 2025',
    products: 24,
    rating: 4.8,
    verified: true,
    avatar: 'https://i.pravatar.cc/150?img=13'
  },
  {
    id: '4',
    name: 'Dian Purnama',
    email: 'dian@example.com',
    role: 'seller',
    status: 'pending',
    joinDate: '10 May 2025',
    products: 8,
    rating: 0,
    verified: false,
    avatar: 'https://i.pravatar.cc/150?img=14'
  },
  {
    id: '5',
    name: 'Erik Surya',
    email: 'erik@example.com',
    role: 'buyer',
    status: 'suspended',
    joinDate: '05 Jan 2025',
    orders: 3,
    verified: true,
    avatar: 'https://i.pravatar.cc/150?img=15'
  },
];

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    // Filter berdasarkan pencarian
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter berdasarkan tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'buyers') return user.role === 'buyer' && matchesSearch;
    if (activeTab === 'sellers') return user.role === 'seller' && matchesSearch;
    if (activeTab === 'pending') return user.status === 'pending' && matchesSearch;
    if (activeTab === 'suspended') return user.status === 'suspended' && matchesSearch;
    
    return matchesSearch;
  });

  const handleStatusChange = (userId: string, newStatus: string) => {
    // Dalam aplikasi sebenarnya, ini akan mengirim permintaan ke backend
    console.log(`Changing user ${userId} status to ${newStatus}`);
  };

  const renderUserItem = (user: any) => (
    <div key={user.id} className="bg-white rounded-lg p-4 border mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div className="ml-3">
            <div className="flex items-center">
              <h3 className="font-medium">{user.name}</h3>
              {user.verified && (
                <CheckCircle size={14} className="ml-1 text-green-500" />
              )}
            </div>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="flex items-center mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                user.status === 'active' ? 'bg-green-100 text-green-800' :
                user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {user.status === 'active' ? 'Aktif' :
                 user.status === 'pending' ? 'Menunggu Verifikasi' : 'Ditangguhkan'}
              </span>
              <span className="text-xs text-gray-500 ml-2">Bergabung {user.joinDate}</span>
            </div>
          </div>
        </div>
        
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2">
                <MoreVertical size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'active')}>
                <UserCheck className="mr-2 h-4 w-4" />
                <span>Verifikasi/Aktifkan</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'suspended')}>
                <UserX className="mr-2 h-4 w-4" />
                <span>Tangguhkan</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                <span>Hapus Akun</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Additional details based on role */}
      <div className="mt-3 pt-2 border-t">
        {user.role === 'buyer' ? (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Pembelian:</span>
            <span className="font-medium">{user.orders} pesanan</span>
          </div>
        ) : (
          <div className="flex justify-between text-sm space-y-1 flex-col">
            <div className="flex justify-between">
              <span className="text-gray-500">Produk:</span>
              <span className="font-medium">{user.products} item</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Rating:</span>
              <span className="font-medium">{user.rating > 0 ? `${user.rating}/5.0` : 'Belum ada'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manajemen Pengguna</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        {/* Search */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            className="pl-10 w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Cari pengguna..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">Semua</TabsTrigger>
            <TabsTrigger value="buyers" className="flex-1">Pembeli</TabsTrigger>
            <TabsTrigger value="sellers" className="flex-1">Penjual</TabsTrigger>
            <TabsTrigger value="pending" className="flex-1">Menunggu</TabsTrigger>
            <TabsTrigger value="suspended" className="flex-1">Ditangguhkan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(renderUserItem)
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada pengguna yang ditemukan</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="buyers" className="mt-0">
            {filteredUsers.filter(user => user.role === 'buyer').length > 0 ? (
              filteredUsers.filter(user => user.role === 'buyer').map(renderUserItem)
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada pembeli yang ditemukan</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sellers" className="mt-0">
            {filteredUsers.filter(user => user.role === 'seller').length > 0 ? (
              filteredUsers.filter(user => user.role === 'seller').map(renderUserItem)
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada penjual yang ditemukan</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            {filteredUsers.filter(user => user.status === 'pending').length > 0 ? (
              filteredUsers.filter(user => user.status === 'pending').map(renderUserItem)
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada pengguna yang menunggu verifikasi</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="suspended" className="mt-0">
            {filteredUsers.filter(user => user.status === 'suspended').length > 0 ? (
              filteredUsers.filter(user => user.status === 'suspended').map(renderUserItem)
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada pengguna yang ditangguhkan</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminUsersPage;
