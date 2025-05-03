
import React, { useState } from 'react';
import { Search, PackageCheck, Truck, Package, Clock, CheckCircle, Filter, ChevronDown } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

// Mock data untuk pesanan
const mockOrders = [
  {
    id: 'ORD-12345',
    customer: {
      name: 'Ahmad Rasyid',
      address: 'Jl. Sudirman No. 123, Jakarta',
      phone: '08123456789'
    },
    date: '03 Mei 2025',
    items: [
      { id: 'P1', name: 'Sepatu Running Nike Air Zoom', qty: 1, price: 1500000 },
    ],
    total: 1500000,
    status: 'new',
    paymentStatus: 'paid',
    paymentMethod: 'bank_transfer',
    shippingMethod: 'JNE Regular'
  },
  {
    id: 'ORD-12346',
    customer: {
      name: 'Siti Nuraini',
      address: 'Jl. Gatot Subroto No. 45, Bandung',
      phone: '08234567890'
    },
    date: '02 Mei 2025',
    items: [
      { id: 'P2', name: 'Kemeja Flanel Uniqlo', qty: 2, price: 349000 },
      { id: 'P3', name: 'Celana Chino Slim Fit', qty: 1, price: 299000 },
    ],
    total: 997000,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'e_wallet',
    shippingMethod: 'SiCepat REG'
  },
  {
    id: 'ORD-12347',
    customer: {
      name: 'Budi Santoso',
      address: 'Jl. Diponegoro No. 78, Surabaya',
      phone: '08345678901'
    },
    date: '01 Mei 2025',
    items: [
      { id: 'P4', name: 'Headphone Sony WH-1000XM4', qty: 1, price: 3999000 },
    ],
    total: 3999000,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    shippingMethod: 'JNT Express',
    trackingNumber: 'JNT1234567890'
  },
  {
    id: 'ORD-12348',
    customer: {
      name: 'Dewi Lestari',
      address: 'Jl. Ahmad Yani No. 56, Semarang',
      phone: '08456789012'
    },
    date: '30 Apr 2025',
    items: [
      { id: 'P5', name: 'Dress Floral Summer', qty: 1, price: 450000 },
      { id: 'P6', name: 'Cardigan Rajut', qty: 1, price: 275000 },
    ],
    total: 725000,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'e_wallet',
    shippingMethod: 'J&T Express',
    trackingNumber: 'JT0987654321'
  },
  {
    id: 'ORD-12349',
    customer: {
      name: 'Eko Prasetyo',
      address: 'Jl. Pahlawan No. 34, Yogyakarta',
      phone: '08567890123'
    },
    date: '29 Apr 2025',
    items: [
      { id: 'P7', name: 'Smartphone Samsung Galaxy S21', qty: 1, price: 12999000 },
    ],
    total: 12999000,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'bank_transfer',
    shippingMethod: 'SiCepat BEST'
  }
];

// Status label & color mapping
const orderStatusMap: any = {
  new: { label: 'Pesanan Baru', color: 'bg-blue-100 text-blue-800', icon: Package },
  processing: { label: 'Sedang Diproses', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  shipped: { label: 'Dikirim', color: 'bg-purple-100 text-purple-800', icon: Truck },
  completed: { label: 'Selesai', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800', icon: PackageCheck }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
};

const SellerOrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = mockOrders.filter(order => {
    // Filter berdasarkan pencarian
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter berdasarkan tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'new') return order.status === 'new' && matchesSearch;
    if (activeTab === 'processing') return order.status === 'processing' && matchesSearch;
    if (activeTab === 'shipped') return order.status === 'shipped' && matchesSearch;
    if (activeTab === 'completed') return order.status === 'completed' && matchesSearch;
    
    return matchesSearch;
  });

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    // Dalam aplikasi sebenarnya, ini akan mengirim permintaan ke backend
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manajemen Pesanan</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        {/* Search and filter */}
        <div className="flex mb-4 gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              className="pl-10 w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Cari pesanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-1 border rounded-lg px-4 py-2 bg-gray-50 text-gray-700">
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
            <ChevronDown size={16} />
          </button>
        </div>
        
        {/* Order status tabs */}
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">
              Semua
            </TabsTrigger>
            <TabsTrigger value="new" className="flex-1">
              Baru
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                {mockOrders.filter(o => o.status === 'new').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="processing" className="flex-1">
              Diproses
            </TabsTrigger>
            <TabsTrigger value="shipped" className="flex-1">
              Dikirim
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">
              Selesai
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map(order => (
                  <Collapsible
                    key={order.id}
                    open={expandedOrder === order.id}
                    onOpenChange={() => {
                      setExpandedOrder(expandedOrder === order.id ? null : order.id);
                    }}
                    className="border rounded-lg overflow-hidden"
                  >
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">{order.id}</span>
                            <span className="ml-3 text-sm text-gray-500">{order.date}</span>
                          </div>
                          <p className="text-sm mt-1">{order.customer.name}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`flex items-center px-3 py-1 rounded-full mr-3 text-sm ${orderStatusMap[order.status].color}`}>
                            {React.createElement(orderStatusMap[order.status].icon, { size: 16, className: "mr-1" })}
                            <span>{orderStatusMap[order.status].label}</span>
                          </div>
                          <ChevronDown
                            className={`transition-transform duration-200 ${
                              expandedOrder === order.id ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="border-t p-4">
                        {/* Order details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium mb-2">Detail Pesanan</h3>
                            <div className="space-y-1 text-sm">
                              <p><span className="text-gray-500">Status Pembayaran:</span> {order.paymentStatus === 'paid' ? 'Dibayar' : 'Belum Dibayar'}</p>
                              <p><span className="text-gray-500">Metode Pembayaran:</span> {
                                order.paymentMethod === 'bank_transfer' ? 'Transfer Bank' :
                                order.paymentMethod === 'e_wallet' ? 'E-Wallet' :
                                order.paymentMethod === 'credit_card' ? 'Kartu Kredit' : order.paymentMethod
                              }</p>
                              <p><span className="text-gray-500">Metode Pengiriman:</span> {order.shippingMethod}</p>
                              {order.trackingNumber && (
                                <p><span className="text-gray-500">No. Resi:</span> {order.trackingNumber}</p>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-2">Detail Pelanggan</h3>
                            <div className="space-y-1 text-sm">
                              <p><span className="text-gray-500">Nama:</span> {order.customer.name}</p>
                              <p><span className="text-gray-500">Telepon:</span> {order.customer.phone}</p>
                              <p><span className="text-gray-500">Alamat:</span> {order.customer.address}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Product items */}
                        <div className="mt-4">
                          <h3 className="font-medium mb-2">Produk</h3>
                          <div className="space-y-2">
                            {order.items.map(item => (
                              <div key={item.id} className="flex justify-between items-center p-2 border rounded-md">
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                </div>
                                <div className="text-right">
                                  <p>{formatCurrency(item.price)}</p>
                                  <p className="text-sm text-gray-500">Total: {formatCurrency(item.price * item.qty)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 text-right">
                            <p className="font-medium">Total Pesanan: {formatCurrency(order.total)}</p>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="mt-6 flex flex-wrap gap-2">
                          {order.status === 'new' && (
                            <>
                              <button 
                                className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center"
                                onClick={() => handleUpdateOrderStatus(order.id, 'processing')}
                              >
                                <Package className="mr-1" size={18} />
                                Proses Pesanan
                              </button>
                              <button className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center">
                                Batalkan
                              </button>
                            </>
                          )}
                          
                          {order.status === 'processing' && (
                            <button 
                              className="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center"
                              onClick={() => handleUpdateOrderStatus(order.id, 'shipped')}
                            >
                              <Truck className="mr-1" size={18} />
                              Kirim Pesanan
                            </button>
                          )}
                          
                          {order.status === 'shipped' && (
                            <button 
                              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
                              onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                            >
                              <CheckCircle className="mr-1" size={18} />
                              Selesaikan Pesanan
                            </button>
                          )}
                          
                          <button className="px-4 py-2 border border-gray-300 rounded-md">
                            Cetak Label
                          </button>
                          
                          <button className="px-4 py-2 border border-gray-300 rounded-md">
                            Hubungi Pembeli
                          </button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada pesanan yang ditemukan</p>
              </div>
            )}
          </TabsContent>
          
          {/* Content for other tabs would be similar, filtered by status */}
          {['new', 'processing', 'shipped', 'completed'].map(tab => (
            <TabsContent key={tab} value={tab} className="mt-0">
              {filteredOrders.filter(order => order.status === tab).length > 0 ? (
                <div className="space-y-4">
                  {filteredOrders
                    .filter(order => order.status === tab)
                    .map(order => (
                      <Collapsible
                        key={order.id}
                        open={expandedOrder === order.id}
                        onOpenChange={() => {
                          setExpandedOrder(expandedOrder === order.id ? null : order.id);
                        }}
                        className="border rounded-lg overflow-hidden"
                      >
                        {/* Same content structure as in 'all' tab */}
                        <CollapsibleTrigger className="w-full text-left">
                          <div className="flex items-center justify-between p-4">
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium">{order.id}</span>
                                <span className="ml-3 text-sm text-gray-500">{order.date}</span>
                              </div>
                              <p className="text-sm mt-1">{order.customer.name}</p>
                            </div>
                            
                            <div className="flex items-center">
                              <div className={`flex items-center px-3 py-1 rounded-full mr-3 text-sm ${orderStatusMap[order.status].color}`}>
                                {React.createElement(orderStatusMap[order.status].icon, { size: 16, className: "mr-1" })}
                                <span>{orderStatusMap[order.status].label}</span>
                              </div>
                              <ChevronDown className="transition-transform duration-200" />
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          {/* Same order details as in 'all' tab */}
                          <div className="border-t p-4">
                            {/* Order details section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Same order details content */}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Tidak ada pesanan {
                    tab === 'new' ? 'baru' :
                    tab === 'processing' ? 'yang sedang diproses' :
                    tab === 'shipped' ? 'yang sedang dikirim' :
                    'yang selesai'
                  } ditemukan</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default SellerOrdersPage;
