import React, { useState } from 'react';
import { Plus, Trash2, Edit, Calendar, Clock, Tag, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  TabsTrigger
} from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

// Mock data for promotions
const mockPromotions = [
  {
    id: 'promo-1',
    name: 'Diskon Hari Raya',
    type: 'discount',
    value: 15, // 15% discount
    minPurchase: 100000,
    products: 'all',
    startDate: '2025-05-15',
    endDate: '2025-05-30',
    status: 'active'
  },
  {
    id: 'promo-2',
    name: 'Bundling Paket Hemat',
    type: 'bundle',
    products: 'selected',
    description: 'Beli 2 kemeja, dapatkan 1 dasi gratis',
    startDate: '2025-05-10',
    endDate: '2025-06-10',
    status: 'active'
  },
  {
    id: 'promo-3',
    name: 'Flash Sale Weekend',
    type: 'flash_sale',
    value: 30, // 30% discount
    products: 'selected',
    startDate: '2025-05-25',
    endDate: '2025-05-26',
    status: 'upcoming'
  },
  {
    id: 'promo-4',
    name: 'Gratis Ongkir',
    type: 'shipping',
    minPurchase: 300000,
    products: 'all',
    startDate: '2025-05-01',
    endDate: '2025-05-10',
    status: 'expired'
  }
];

// Promotion type details
const promotionTypes = [
  { id: 'discount', name: 'Diskon Persentase', icon: Tag },
  { id: 'fixed', name: 'Diskon Nominal', icon: Tag },
  { id: 'bundle', name: 'Bundling Produk', icon: Package },
  { id: 'flash_sale', name: 'Flash Sale', icon: Clock },
  { id: 'shipping', name: 'Gratis Ongkir', icon: Package },
];

const SellerPromotionsPage = () => {
  const { toast } = useToast();
  const [promotions, setPromotions] = useState(mockPromotions);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<any>(null);
  
  // New promotion form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'discount',
    value: 0,
    minPurchase: 0,
    products: 'all',
    startDate: '',
    endDate: '',
    description: ''
  });

  const filteredPromotions = promotions.filter(promo => 
    promo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNewPromotion = () => {
    setEditingPromotion(null);
    setFormData({
      name: '',
      type: 'discount',
      value: 0,
      minPurchase: 0,
      products: 'all',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditPromotion = (promotion: any) => {
    setEditingPromotion(promotion);
    setFormData({
      name: promotion.name,
      type: promotion.type,
      value: promotion.value || 0,
      minPurchase: promotion.minPurchase || 0,
      products: promotion.products || 'all',
      startDate: promotion.startDate || '',
      endDate: promotion.endDate || '',
      description: promotion.description || ''
    });
    setIsDialogOpen(true);
  };

  const handleDeletePromotion = (promotionId: string) => {
    setPromotions(promotions.filter(p => p.id !== promotionId));
    toast({
      title: "Promosi dihapus",
      description: "Promosi berhasil dihapus.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSavePromotion = () => {
    if (editingPromotion) {
      // Update existing promotion
      setPromotions(promotions.map(p => 
        p.id === editingPromotion.id ? 
        { ...formData, id: editingPromotion.id, status: editingPromotion.status } : 
        p
      ));
      toast({
        title: "Promosi diperbarui",
        description: "Promosi berhasil diperbarui.",
      });
    } else {
      // Add new promotion
      const newPromotion = {
        ...formData,
        id: `promo-${Date.now()}`,
        status: new Date(formData.startDate) > new Date() ? 'upcoming' : 
                new Date(formData.endDate) < new Date() ? 'expired' : 'active'
      };
      setPromotions([...promotions, newPromotion]);
      toast({
        title: "Promosi ditambahkan",
        description: "Promosi baru berhasil ditambahkan.",
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Promosi</h1>
        <Button 
          onClick={handleAddNewPromotion}
          className="bg-primary text-white"
        >
          <Plus size={18} className="mr-2" />
          Buat Promosi Baru
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full mb-6">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="all" className="flex-1">Semua</TabsTrigger>
          <TabsTrigger value="active" className="flex-1">Aktif</TabsTrigger>
          <TabsTrigger value="upcoming" className="flex-1">Akan Datang</TabsTrigger>
          <TabsTrigger value="expired" className="flex-1">Berakhir</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Input
                  placeholder="Cari promosi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {filteredPromotions.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama Promosi</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Nilai</TableHead>
                        <TableHead>Periode</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPromotions.map((promo) => (
                        <TableRow key={promo.id}>
                          <TableCell className="font-medium">{promo.name}</TableCell>
                          <TableCell>
                            {promo.type === 'discount' && 'Diskon Persentase'}
                            {promo.type === 'fixed' && 'Diskon Nominal'}
                            {promo.type === 'bundle' && 'Bundling Produk'}
                            {promo.type === 'flash_sale' && 'Flash Sale'}
                            {promo.type === 'shipping' && 'Gratis Ongkir'}
                          </TableCell>
                          <TableCell>
                            {promo.type === 'discount' && `${promo.value}%`}
                            {promo.type === 'fixed' && `Rp ${promo.value.toLocaleString('id-ID')}`}
                            {promo.type === 'bundle' && '-'}
                            {promo.type === 'flash_sale' && `${promo.value}%`}
                            {promo.type === 'shipping' && `Min. Rp ${promo.minPurchase?.toLocaleString('id-ID')}`}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-1" />
                              <span>{promo.startDate} - {promo.endDate}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              promo.status === 'active' ? 'bg-green-100 text-green-800' : 
                              promo.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {promo.status === 'active' ? 'Aktif' : 
                               promo.status === 'upcoming' ? 'Akan Datang' : 
                               'Berakhir'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditPromotion(promo)}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeletePromotion(promo.id)}
                              >
                                <Trash2 size={16} className="text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="border rounded-lg p-6 text-center text-gray-500">
                  <p>Tidak ada promosi yang ditemukan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs content would be similar with filtered data */}
        {['active', 'upcoming', 'expired'].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue}>
            <Card>
              <CardContent className="p-4">
                {filteredPromotions.filter(p => p.status === tabValue).length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama Promosi</TableHead>
                          <TableHead>Tipe</TableHead>
                          <TableHead>Nilai</TableHead>
                          <TableHead>Periode</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPromotions
                          .filter(p => p.status === tabValue)
                          .map((promo) => (
                            <TableRow key={promo.id}>
                              <TableCell className="font-medium">{promo.name}</TableCell>
                              <TableCell>
                                {promo.type === 'discount' && 'Diskon Persentase'}
                                {promo.type === 'fixed' && 'Diskon Nominal'}
                                {promo.type === 'bundle' && 'Bundling Produk'}
                                {promo.type === 'flash_sale' && 'Flash Sale'}
                                {promo.type === 'shipping' && 'Gratis Ongkir'}
                              </TableCell>
                              <TableCell>
                                {promo.type === 'discount' && `${promo.value}%`}
                                {promo.type === 'fixed' && `Rp ${promo.value.toLocaleString('id-ID')}`}
                                {promo.type === 'bundle' && '-'}
                                {promo.type === 'flash_sale' && `${promo.value}%`}
                                {promo.type === 'shipping' && `Min. Rp ${promo.minPurchase?.toLocaleString('id-ID')}`}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Calendar size={16} className="mr-1" />
                                  <span>{promo.startDate} - {promo.endDate}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  promo.status === 'active' ? 'bg-green-100 text-green-800' : 
                                  promo.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {promo.status === 'active' ? 'Aktif' : 
                                  promo.status === 'upcoming' ? 'Akan Datang' : 
                                  'Berakhir'}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditPromotion(promo)}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeletePromotion(promo.id)}
                                  >
                                    <Trash2 size={16} className="text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="border rounded-lg p-6 text-center text-gray-500">
                    <p>Tidak ada promosi {
                      tabValue === 'active' ? 'aktif' :
                      tabValue === 'upcoming' ? 'mendatang' :
                      'yang telah berakhir'
                    } ditemukan</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Promotion Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingPromotion ? 'Edit Promosi' : 'Buat Promosi Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingPromotion 
                ? 'Edit detail promosi di bawah ini.' 
                : 'Tambahkan promosi baru untuk menarik pembeli.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">Nama</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Nama promosi"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right text-sm font-medium">Tipe</label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih tipe promosi" />
                </SelectTrigger>
                <SelectContent>
                  {promotionTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center">
                        {React.createElement(type.icon, { size: 16, className: "mr-2" })}
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(formData.type === 'discount' || formData.type === 'fixed' || formData.type === 'flash_sale') && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="value" className="text-right text-sm font-medium">
                  {formData.type === 'fixed' ? 'Nominal' : 'Persentase'}
                </label>
                <div className="col-span-3 flex items-center">
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="flex-1"
                    placeholder={formData.type === 'fixed' ? "Jumlah diskon" : "Persentase diskon"}
                  />
                  <span className="ml-2">{formData.type === 'fixed' ? 'Rupiah' : '%'}</span>
                </div>
              </div>
            )}

            {(formData.type === 'shipping' || formData.type === 'discount' || formData.type === 'fixed') && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="minPurchase" className="text-right text-sm font-medium">Min. Belanja</label>
                <Input
                  id="minPurchase"
                  name="minPurchase"
                  type="number"
                  value={formData.minPurchase}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Minimum pembelian"
                />
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="products" className="text-right text-sm font-medium">Produk</label>
              <Select
                value={formData.products}
                onValueChange={(value) => handleSelectChange('products', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih cakupan produk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Produk</SelectItem>
                  <SelectItem value="selected">Produk Tertentu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="startDate" className="text-right text-sm font-medium">Mulai</label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="endDate" className="text-right text-sm font-medium">Berakhir</label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {formData.type === 'bundle' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium">Deskripsi</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleTextareaChange}
                  className="col-span-3 border rounded-md p-2 min-h-[80px]"
                  placeholder="Deskripsi bundling produk"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSavePromotion}>
              {editingPromotion ? 'Perbarui' : 'Buat'} Promosi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerPromotionsPage;
