
import React, { useState } from 'react';
import { Calendar, Clock, Tag, Trash, Edit, Plus, CalendarDays } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Promotion interface
interface Promotion {
  id: string;
  name: string;
  type: 'discount' | 'flash_sale' | 'special_event' | 'holiday' | 'seasonal';
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'expired';
  description: string;
  bannerImage?: string;
  affectedCategories: string[];
}

// Mock data for promotions
const mockPromotions: Promotion[] = [
  {
    id: 'promo1',
    name: 'Harbolnas 11.11',
    type: 'flash_sale',
    value: 40,
    startDate: '2025-11-11',
    endDate: '2025-11-12',
    status: 'upcoming',
    description: 'Diskon besar-besaran dalam rangka hari belanja online nasional',
    bannerImage: '/placeholder.svg',
    affectedCategories: ['Electronics', 'Fashion']
  },
  {
    id: 'promo2',
    name: 'Year End Sale',
    type: 'seasonal',
    value: 30,
    startDate: '2025-12-20',
    endDate: '2025-12-31',
    status: 'upcoming',
    description: 'Diskon akhir tahun untuk semua kategori produk',
    affectedCategories: ['All']
  },
  {
    id: 'promo3',
    name: 'Payday Sale',
    type: 'special_event',
    value: 15,
    startDate: '2025-06-25',
    endDate: '2025-06-30',
    status: 'active',
    description: 'Diskon spesial untuk gajian akhir bulan',
    affectedCategories: ['Fashion', 'Beauty', 'Home']
  },
  {
    id: 'promo4',
    name: 'Ramadan Special',
    type: 'holiday',
    value: 25,
    startDate: '2025-03-01',
    endDate: '2025-04-02',
    status: 'expired',
    description: 'Promo spesial Ramadan untuk semua kebutuhan',
    affectedCategories: ['All']
  }
];

// Promotion types with icons
const promoTypes = [
  { id: 'discount', name: 'Regular Discount', icon: Tag },
  { id: 'flash_sale', name: 'Flash Sale', icon: Clock },
  { id: 'special_event', name: 'Special Event', icon: Calendar },
  { id: 'holiday', name: 'Holiday Sale', icon: CalendarDays },
  { id: 'seasonal', name: 'Seasonal Sale', icon: Tag },
];

const AdminPromotionsPage = () => {
  const { toast } = useToast();
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'discount' as Promotion['type'],
    value: 0,
    startDate: '',
    endDate: '',
    description: '',
    affectedCategories: ['All'],
  });
  
  // Get today's date in YYYY-MM-DD format for date inputs
  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    setFormData(prev => {
      if (value === 'All' && checked) {
        return { ...prev, affectedCategories: ['All'] };
      }
      
      if (value === 'All' && !checked) {
        return { ...prev, affectedCategories: [] };
      }
      
      if (checked) {
        const newCategories = prev.affectedCategories.includes('All')
          ? [value]
          : [...prev.affectedCategories, value];
        return { ...prev, affectedCategories: newCategories };
      } else {
        return { 
          ...prev, 
          affectedCategories: prev.affectedCategories.filter(cat => cat !== value) 
        };
      }
    });
  };

  const handleAddPromotion = () => {
    setEditingPromotion(null);
    setFormData({
      name: '',
      type: 'discount',
      value: 0,
      startDate: today,
      endDate: '',
      description: '',
      affectedCategories: ['All'],
    });
    setIsDialogOpen(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setFormData({
      name: promotion.name,
      type: promotion.type,
      value: promotion.value,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      description: promotion.description,
      affectedCategories: [...promotion.affectedCategories],
    });
    setIsDialogOpen(true);
  };

  const handleDeletePromotion = (id: string) => {
    setPromotions(promotions.filter(promo => promo.id !== id));
    toast({
      title: "Promotion deleted",
      description: "The promotion has been removed successfully."
    });
  };

  // Determine status based on dates
  const getStatusFromDates = (startDate: string, endDate: string): Promotion['status'] => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return 'upcoming';
    if (now > end) return 'expired';
    return 'active';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const status = getStatusFromDates(formData.startDate, formData.endDate);
    
    if (editingPromotion) {
      // Update existing promotion
      setPromotions(promotions.map(p => 
        p.id === editingPromotion.id 
          ? { ...editingPromotion, ...formData, status } 
          : p
      ));
      
      toast({
        title: "Promotion updated",
        description: `${formData.name} has been updated successfully.`
      });
    } else {
      // Add new promotion
      const newPromotion: Promotion = {
        ...formData,
        id: `promo${Date.now()}`,
        status,
      };
      
      setPromotions([...promotions, newPromotion]);
      
      toast({
        title: "Promotion created",
        description: `${formData.name} has been created successfully.`
      });
    }
    
    setIsDialogOpen(false);
  };

  // Filter promotions based on search and tab
  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return promo.status === 'active' && matchesSearch;
    if (activeTab === 'upcoming') return promo.status === 'upcoming' && matchesSearch;
    if (activeTab === 'expired') return promo.status === 'expired' && matchesSearch;
    
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Upcoming</Badge>;
      case 'expired':
        return <Badge variant="outline" className="border-gray-500 text-gray-500">Expired</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Global Promotions</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search promotions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
          
          <Button onClick={handleAddPromotion}>
            <Plus className="mr-2 h-4 w-4" />
            Create Promotion
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell className="font-medium">{promo.name}</TableCell>
                    <TableCell>
                      {promoTypes.find(t => t.id === promo.type)?.name || promo.type}
                    </TableCell>
                    <TableCell>{promo.value}%</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{new Date(promo.startDate).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-500">to</span>
                        <span>{new Date(promo.endDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(promo.status)}</TableCell>
                    <TableCell>
                      {promo.affectedCategories.includes('All') ? (
                        <span>All Categories</span>
                      ) : (
                        <span>{promo.affectedCategories.join(', ')}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditPromotion(promo)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          onClick={() => handleDeletePromotion(promo.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredPromotions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No promotions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="active">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell className="font-medium">{promo.name}</TableCell>
                    <TableCell>
                      {promoTypes.find(t => t.id === promo.type)?.name || promo.type}
                    </TableCell>
                    <TableCell>{promo.value}%</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{new Date(promo.startDate).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-500">to</span>
                        <span>{new Date(promo.endDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {promo.affectedCategories.includes('All') ? (
                        <span>All Categories</span>
                      ) : (
                        <span>{promo.affectedCategories.join(', ')}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditPromotion(promo)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          onClick={() => handleDeletePromotion(promo.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredPromotions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No active promotions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="upcoming">
            {/* Similar table structure as above for upcoming promotions */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell className="font-medium">{promo.name}</TableCell>
                    <TableCell>{promoTypes.find(t => t.id === promo.type)?.name || promo.type}</TableCell>
                    <TableCell>{promo.value}%</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{new Date(promo.startDate).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-500">to</span>
                        <span>{new Date(promo.endDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {promo.affectedCategories.includes('All') ? (
                        <span>All Categories</span>
                      ) : (
                        <span>{promo.affectedCategories.join(', ')}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditPromotion(promo)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          onClick={() => handleDeletePromotion(promo.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredPromotions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No upcoming promotions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="expired">
            {/* Similar table structure as above for expired promotions */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell className="font-medium">{promo.name}</TableCell>
                    <TableCell>{promoTypes.find(t => t.id === promo.type)?.name || promo.type}</TableCell>
                    <TableCell>{promo.value}%</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{new Date(promo.startDate).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-500">to</span>
                        <span>{new Date(promo.endDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {promo.affectedCategories.includes('All') ? (
                        <span>All Categories</span>
                      ) : (
                        <span>{promo.affectedCategories.join(', ')}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditPromotion(promo)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          onClick={() => handleDeletePromotion(promo.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredPromotions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No expired promotions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Promotion Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPromotion ? "Edit Promotion" : "Create Global Promotion"}
            </DialogTitle>
            <DialogDescription>
              {editingPromotion
                ? "Update the promotion details below."
                : "Fill in the details to create a new global promotion."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Promotion Name*
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Promotion Type*
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                {promoTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="value" className="text-sm font-medium">
                Discount Value (%)*
              </label>
              <Input
                id="value"
                name="value"
                type="number"
                min="0"
                max="100"
                value={formData.value}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium">
                  Start Date*
                </label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  min={today}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium">
                  End Date*
                </label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={formData.startDate || today}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 h-20"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Affected Categories*</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cat-all"
                    value="All"
                    checked={formData.affectedCategories.includes('All')}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  <label htmlFor="cat-all" className="text-sm">All Categories</label>
                </div>
                
                {/* Individual categories only shown if "All" is not selected */}
                {!formData.affectedCategories.includes('All') && (
                  <div className="ml-6 grid grid-cols-2 gap-2">
                    {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books', 'Toys'].map(
                      (category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`cat-${category}`}
                            value={category}
                            checked={formData.affectedCategories.includes(category)}
                            onChange={handleCategoryChange}
                            className="mr-2"
                          />
                          <label htmlFor={`cat-${category}`} className="text-sm">{category}</label>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit">
                {editingPromotion ? "Update Promotion" : "Create Promotion"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPromotionsPage;
