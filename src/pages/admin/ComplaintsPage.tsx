
import React, { useState } from 'react';
import { MessageCircle, User, ShoppingBag, Repeat, AlertTriangle, Check, X, ChevronRight, Search, Clock, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Interface definitions
interface Complaint {
  id: string;
  type: 'refund' | 'return' | 'missing_item' | 'damaged' | 'wrong_item' | 'other';
  orderId: string;
  customerId: string;
  customerName: string;
  sellerId: string;
  sellerName: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dateSubmitted: string;
  lastUpdated: string;
  details: string;
  resolution?: string;
  sellerResponse?: string;
  refundAmount?: number;
}

// Mock data for complaints
const mockComplaints: Complaint[] = [
  {
    id: 'CMPT-1001',
    type: 'refund',
    orderId: 'ORD-58742',
    customerId: 'CUST-12345',
    customerName: 'Budi Santoso',
    sellerId: 'SLR-7890',
    sellerName: 'ElektronikPro',
    status: 'pending',
    priority: 'medium',
    dateSubmitted: '2025-05-01T09:30:00',
    lastUpdated: '2025-05-01T09:30:00',
    details: 'Produk tidak sesuai dengan deskripsi. Kualitas lebih rendah dari yang diiklankan.',
  },
  {
    id: 'CMPT-1002',
    type: 'damaged',
    orderId: 'ORD-60123',
    customerId: 'CUST-23456',
    customerName: 'Siti Nuraini',
    sellerId: 'SLR-4567',
    sellerName: 'FashionTrends',
    status: 'in_progress',
    priority: 'high',
    dateSubmitted: '2025-05-02T14:20:00',
    lastUpdated: '2025-05-03T10:15:00',
    details: 'Pakaian yang dikirim robek di bagian lengan. Saya minta penggantian produk.',
    sellerResponse: 'Kami mohon maaf atas kejadian ini. Kami akan segera mengirimkan produk pengganti.'
  },
  {
    id: 'CMPT-1003',
    type: 'missing_item',
    orderId: 'ORD-59876',
    customerId: 'CUST-34567',
    customerName: 'Andi Wijaya',
    sellerId: 'SLR-1234',
    sellerName: 'GadgetWorld',
    status: 'resolved',
    priority: 'medium',
    dateSubmitted: '2025-04-28T16:45:00',
    lastUpdated: '2025-05-02T13:10:00',
    details: 'Salah satu item dalam pesanan tidak ada dalam paket yang dikirim.',
    sellerResponse: 'Mohon maaf atas ketidaknyamanannya. Kami akan segera mengirimkan item yang kurang.',
    resolution: 'Penjual telah mengirimkan item yang hilang. Pembeli telah menerima dan mengkonfirmasi penerimaan barang.'
  },
  {
    id: 'CMPT-1004',
    type: 'wrong_item',
    orderId: 'ORD-61234',
    customerId: 'CUST-45678',
    customerName: 'Dian Purnama',
    sellerId: 'SLR-5678',
    sellerName: 'HomeDecorPlus',
    status: 'rejected',
    priority: 'low',
    dateSubmitted: '2025-05-01T11:30:00',
    lastUpdated: '2025-05-04T09:20:00',
    details: 'Warna produk yang dikirim berbeda dengan yang saya pesan.',
    sellerResponse: 'Kami telah memeriksa pesanan dan foto produk. Warna sesuai dengan yang ditampilkan di katalog dan yang dipesan.',
    resolution: 'Setelah pemeriksaan, warna produk sesuai dengan yang ditampilkan di katalog. Tidak ada kesalahan pengiriman.'
  },
  {
    id: 'CMPT-1005',
    type: 'refund',
    orderId: 'ORD-62345',
    customerId: 'CUST-56789',
    customerName: 'Maya Sari',
    sellerId: 'SLR-9012',
    sellerName: 'BeautyHouse',
    status: 'pending',
    priority: 'urgent',
    dateSubmitted: '2025-05-04T08:15:00',
    lastUpdated: '2025-05-04T08:15:00',
    details: 'Produk kosmetik yang dikirim sudah kedaluwarsa. Saya minta pengembalian dana penuh.',
    refundAmount: 150000
  }
];

// Status configuration for complaint types
const complaintTypes = {
  refund: { label: 'Permintaan Refund', icon: ShoppingBag },
  return: { label: 'Pengembalian Barang', icon: Repeat },
  missing_item: { label: 'Barang Tidak Lengkap', icon: AlertTriangle },
  damaged: { label: 'Barang Rusak', icon: AlertTriangle },
  wrong_item: { label: 'Barang Tidak Sesuai', icon: AlertTriangle },
  other: { label: 'Lainnya', icon: MessageCircle }
};

const AdminComplaintsPage = () => {
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [currentComplaint, setCurrentComplaint] = useState<Complaint | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');
  
  // Filter complaints based on search, status, and priority
  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewDetails = (complaint: Complaint) => {
    setCurrentComplaint(complaint);
    setResolutionNote(complaint.resolution || '');
    setIsDetailsOpen(true);
  };
  
  const handleResolveComplaint = () => {
    if (!currentComplaint || !resolutionNote.trim()) {
      toast({
        title: "Resolution note required",
        description: "Please provide a resolution note before resolving the complaint.",
        variant: "destructive"
      });
      return;
    }
    
    setComplaints(complaints.map(complaint => 
      complaint.id === currentComplaint.id ? {
        ...complaint,
        status: 'resolved',
        resolution: resolutionNote,
        lastUpdated: new Date().toISOString()
      } : complaint
    ));
    
    toast({
      title: "Complaint resolved",
      description: `Complaint ${currentComplaint.id} has been successfully resolved.`
    });
    
    setIsDetailsOpen(false);
  };
  
  const handleRejectComplaint = () => {
    if (!currentComplaint || !resolutionNote.trim()) {
      toast({
        title: "Resolution note required",
        description: "Please provide a reason before rejecting the complaint.",
        variant: "destructive"
      });
      return;
    }
    
    setComplaints(complaints.map(complaint => 
      complaint.id === currentComplaint.id ? {
        ...complaint,
        status: 'rejected',
        resolution: resolutionNote,
        lastUpdated: new Date().toISOString()
      } : complaint
    ));
    
    toast({
      title: "Complaint rejected",
      description: `Complaint ${currentComplaint.id} has been rejected.`
    });
    
    setIsDetailsOpen(false);
  };
  
  const handleUpdatePriority = (complaintId: string, priority: Complaint['priority']) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId ? {
        ...complaint,
        priority,
        lastUpdated: new Date().toISOString()
      } : complaint
    ));
    
    toast({
      title: "Priority updated",
      description: `Complaint priority has been updated to ${priority}.`
    });
  };

  // Status badge styling
  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Priority badge styling
  const getPriorityBadge = (priority: Complaint['priority']) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">High</Badge>;
      case 'urgent':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Urgent</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Support & Complaints Management</h1>
      
      <Tabs defaultValue="complaints" className="mb-6">
        <TabsList>
          <TabsTrigger value="complaints">Complaints & Disputes</TabsTrigger>
          <TabsTrigger value="refunds">Refund Requests</TabsTrigger>
          <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="complaints" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="h-4 w-4" />
                </span>
              </div>
              
              <div className="flex space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint) => {
                      const ComplaintIcon = complaintTypes[complaint.type].icon;
                      return (
                        <TableRow key={complaint.id}>
                          <TableCell className="font-medium">{complaint.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <ComplaintIcon className="h-4 w-4 mr-2" />
                              <span>{complaintTypes[complaint.type].label}</span>
                            </div>
                          </TableCell>
                          <TableCell>{complaint.customerName}</TableCell>
                          <TableCell>{complaint.sellerName}</TableCell>
                          <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                          <TableCell>
                            <Select 
                              value={complaint.priority} 
                              onValueChange={(value) => handleUpdatePriority(complaint.id, value as Complaint['priority'])}
                              disabled={complaint.status === 'resolved' || complaint.status === 'rejected'}
                            >
                              <SelectTrigger className="w-24 h-8 text-xs py-0 px-2">
                                <SelectValue placeholder="Priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="urgent">Urgent</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-400" />
                              <span>{new Date(complaint.dateSubmitted).toLocaleDateString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8"
                              onClick={() => handleViewDetails(complaint)}
                            >
                              <span className="mr-1">Details</span>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <MessageCircle className="h-8 w-8 mb-2 opacity-20" />
                          <p>No complaints found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="refunds" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="border rounded-lg p-12 text-center text-gray-500">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium mb-1">Refund Requests</p>
              <p>Pending refund requests will appear here</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="border rounded-lg p-12 text-center text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium mb-1">Customer Feedback</p>
              <p>General customer feedback and suggestions will appear here</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Complaint Details Dialog */}
      {currentComplaint && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Complaint Details - {currentComplaint.id}
              </DialogTitle>
              <DialogDescription>
                Related to order {currentComplaint.orderId}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Status</h4>
                <div>{getStatusBadge(currentComplaint.status)}</div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Priority</h4>
                <div>{getPriorityBadge(currentComplaint.priority)}</div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Customer</h4>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{currentComplaint.customerName}</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Seller</h4>
                <div className="text-gray-900">{currentComplaint.sellerName}</div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Submitted On</h4>
                <div className="text-gray-900">{new Date(currentComplaint.dateSubmitted).toLocaleDateString()}</div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Last Updated</h4>
                <div className="text-gray-900">{new Date(currentComplaint.lastUpdated).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Complaint Details</h4>
              <div className="bg-gray-50 p-3 rounded-md">{currentComplaint.details}</div>
              
              {currentComplaint.refundAmount && (
                <div className="mt-3">
                  <h4 className="font-medium mb-1">Refund Amount</h4>
                  <div className="font-bold text-lg">Rp {currentComplaint.refundAmount.toLocaleString()}</div>
                </div>
              )}
              
              {currentComplaint.sellerResponse && (
                <div className="mt-3">
                  <h4 className="font-medium mb-1">Seller Response</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    {currentComplaint.sellerResponse}
                  </div>
                </div>
              )}
              
              {currentComplaint.resolution && (
                <div className="mt-3">
                  <h4 className="font-medium mb-1">Resolution</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    {currentComplaint.resolution}
                  </div>
                </div>
              )}
            </div>
            
            {(currentComplaint.status === 'pending' || currentComplaint.status === 'in_progress') && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Resolution Note</h4>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 h-32"
                  placeholder="Enter resolution details or reason for rejection..."
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                ></textarea>
                
                <div className="flex space-x-2 justify-end mt-4">
                  <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleRejectComplaint}>
                    <X className="mr-1 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={handleResolveComplaint}>
                    <Check className="mr-1 h-4 w-4" />
                    Resolve
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminComplaintsPage;
