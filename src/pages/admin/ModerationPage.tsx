
import React, { useState } from 'react';
import { Flag, AlertTriangle, Check, X, Eye, MessageSquare, AlertCircle } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockProducts } from '@/lib/mockData';

// Mock data for reported items
const mockReportedItems = [
  {
    id: 'report-1',
    type: 'product',
    itemId: '5', // Reference to mockProducts id
    reportReason: 'inappropriate_content',
    reportDescription: 'Product image shows prohibited items',
    reportedBy: 'user123',
    reportedAt: '2025-05-01T14:30:00',
    status: 'pending',
    reviewNote: '',
  },
  {
    id: 'report-2',
    type: 'review',
    itemId: 'review-5',
    contentPreview: 'This product is terrible and the seller is a **** who doesn\'t care about customers...',
    reportReason: 'abusive_language',
    reportDescription: 'Review contains profanity and personal attacks',
    reportedBy: 'user456',
    reportedAt: '2025-05-02T09:15:00',
    status: 'pending',
    reviewNote: '',
  },
  {
    id: 'report-3',
    type: 'product',
    itemId: '3',
    reportReason: 'counterfeit',
    reportDescription: 'This is a fake product, not authentic',
    reportedBy: 'user789',
    reportedAt: '2025-05-02T11:45:00',
    status: 'reviewed',
    reviewNote: 'Product verified as authentic by seller documentation',
    reviewedAt: '2025-05-03T10:20:00',
  },
  {
    id: 'report-4',
    type: 'review',
    itemId: 'review-8',
    contentPreview: 'Do not buy this! It\'s a complete scam and the seller is deliberately misleading customers.',
    reportReason: 'misinformation',
    reportDescription: 'Review makes false claims about the product',
    reportedBy: 'user101',
    reportedAt: '2025-05-03T16:20:00',
    status: 'removed',
    reviewNote: 'Review contained unverified claims without evidence',
    reviewedAt: '2025-05-04T08:30:00',
  },
  {
    id: 'report-5',
    type: 'comment',
    itemId: 'comment-12',
    contentPreview: 'Hey, check out my store at example.com for better deals!',
    reportReason: 'spam',
    reportDescription: 'Comment is promoting external website',
    reportedBy: 'user202',
    reportedAt: '2025-05-04T07:10:00',
    status: 'pending',
    reviewNote: '',
  }
];

// Mock reviews for moderation
const mockReviews = [
  {
    id: 'review-1',
    productId: '1',
    productName: 'Modern Wireless Earbuds',
    userId: 'user345',
    userName: 'Dita Permata',
    rating: 1,
    content: 'Terrible product! Broke within a week. Customer service is nonexistent. DO NOT BUY!!!',
    date: '2025-05-01',
    status: 'published',
  },
  {
    id: 'review-2',
    productId: '3',
    productName: 'Smart Home Speaker',
    userId: 'user678',
    userName: 'Bambang Sutrisno',
    rating: 4,
    content: 'Great sound quality, but the app is buggy. Overall I like it though.',
    date: '2025-05-02',
    status: 'published',
  },
  {
    id: 'review-3',
    productId: '2',
    productName: 'Premium Cotton T-Shirt',
    userId: 'user901',
    userName: 'Ratna Sari',
    rating: 2,
    content: 'This isn\'t premium cotton, it\'s cheap material. False advertising!',
    date: '2025-05-03',
    status: 'flagged',
  }
];

const reportReasons = {
  inappropriate_content: 'Inappropriate Content',
  counterfeit: 'Counterfeit Product',
  abusive_language: 'Abusive Language',
  spam: 'Spam',
  misinformation: 'Misinformation',
  other: 'Other'
};

const AdminModerationPage = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState(mockReportedItems);
  const [reviews, setReviews] = useState(mockReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewingItem, setViewingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reviewNote, setReviewNote] = useState('');
  
  // Find product information for a report
  const getItemInfo = (report: any) => {
    if (report.type === 'product') {
      const product = mockProducts.find(p => p.id === report.itemId);
      return product ? { 
        title: product.name,
        description: product.description,
        image: product.image
      } : { title: 'Unknown Product', description: '', image: '/placeholder.svg' };
    }
    
    if (report.type === 'review') {
      const content = report.contentPreview || 'No content preview available';
      return { 
        title: 'Product Review',
        description: content,
        image: '/placeholder.svg'
      };
    }
    
    if (report.type === 'comment') {
      return { 
        title: 'Comment',
        description: report.contentPreview || 'No content preview available',
        image: '/placeholder.svg'
      };
    }
    
    return { title: 'Unknown Item', description: '', image: '/placeholder.svg' };
  };
  
  // Filter reports based on search query and status filter
  const filteredReports = reports.filter(report => {
    const itemInfo = getItemInfo(report);
    const matchesSearch = 
      itemInfo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportReason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return report.status === filterStatus && matchesSearch;
  });

  // Handle viewing a reported item
  const handleViewItem = (report: any) => {
    setViewingItem({
      ...report,
      ...getItemInfo(report)
    });
    setReviewNote(report.reviewNote || '');
    setIsDialogOpen(true);
  };

  // Handle moderating a reported item
  const handleModerateItem = (action: 'approve' | 'remove') => {
    if (!viewingItem) return;
    
    setReports(reports.map(report => {
      if (report.id === viewingItem.id) {
        return {
          ...report,
          status: action === 'approve' ? 'approved' : 'removed',
          reviewNote: reviewNote,
          reviewedAt: new Date().toISOString()
        };
      }
      return report;
    }));
    
    toast({
      title: action === 'approve' ? 'Item approved' : 'Item removed',
      description: `The reported item has been ${action === 'approve' ? 'approved and will remain visible' : 'removed from the platform'}.`
    });
    
    setIsDialogOpen(false);
  };
  
  // Handle moderating a review
  const handleReviewAction = (reviewId: string, action: 'approve' | 'remove') => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          status: action === 'approve' ? 'published' : 'removed'
        };
      }
      return review;
    }));
    
    toast({
      title: action === 'approve' ? 'Review approved' : 'Review removed',
      description: `The review has been ${action === 'approve' ? 'approved and published' : 'removed from the product'}.`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Content Moderation</h1>
      
      <Tabs defaultValue="reports" className="w-full">
        <TabsList>
          <TabsTrigger value="reports">Reported Items</TabsTrigger>
          <TabsTrigger value="reviews">Review Moderation</TabsTrigger>
          <TabsTrigger value="products">Product Moderation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="mt-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
              <div className="relative w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search reports..."
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
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="removed">Removed</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => {
                      const itemInfo = getItemInfo(report);
                      return (
                        <TableRow key={report.id}>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {report.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium line-clamp-2">{itemInfo.title}</div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {reportReasons[report.reportReason as keyof typeof reportReasons] || report.reportReason}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{report.reportedBy}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{new Date(report.reportedAt).toLocaleDateString()}</span>
                          </TableCell>
                          <TableCell>
                            {report.status === 'pending' && (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                                Pending
                              </Badge>
                            )}
                            {report.status === 'approved' && (
                              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                Approved
                              </Badge>
                            )}
                            {report.status === 'removed' && (
                              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                                Removed
                              </Badge>
                            )}
                            {report.status === 'reviewed' && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                                Reviewed
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center"
                              onClick={() => handleViewItem(report)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Flag className="h-8 w-8 mb-2 opacity-20" />
                          <p>No reported items found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Review Moderation Queue</h2>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review) => (
                    <TableRow key={review.id} className={review.status === 'flagged' ? 'bg-red-50' : ''}>
                      <TableCell className="font-medium">{review.productName}</TableCell>
                      <TableCell>{review.userName}</TableCell>
                      <TableCell>
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs line-clamp-2">{review.content}</div>
                      </TableCell>
                      <TableCell>{review.date}</TableCell>
                      <TableCell>
                        {review.status === 'published' && (
                          <Badge className="bg-green-100 text-green-800 border-none">
                            Published
                          </Badge>
                        )}
                        {review.status === 'flagged' && (
                          <Badge className="bg-red-100 text-red-800 border-none">
                            Flagged
                          </Badge>
                        )}
                        {review.status === 'removed' && (
                          <Badge className="bg-gray-100 text-gray-800 border-none">
                            Removed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:text-green-800 hover:bg-green-50 h-8 w-8"
                            onClick={() => handleReviewAction(review.id, 'approve')}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 h-8 w-8"
                            onClick={() => handleReviewAction(review.id, 'remove')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {reviews.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <MessageSquare className="h-8 w-8 mb-2 opacity-20" />
                          <p>No reviews requiring moderation</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="mt-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Product Moderation</h2>
            
            <div className="border rounded-lg p-12 text-center text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium mb-1">Products requiring review will appear here</p>
              <p>Newly uploaded products or products flagged by users will be shown for moderation</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Dialog for viewing and moderating reported items */}
      {viewingItem && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Flag className="mr-2 h-5 w-5 text-amber-500" />
                Reported {viewingItem.type.charAt(0).toUpperCase() + viewingItem.type.slice(1)}
              </DialogTitle>
              <DialogDescription>
                Review the reported content and take appropriate action
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={viewingItem.image} 
                      alt="Reported item"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                
                <div className="md:col-span-3 space-y-3">
                  <div>
                    <h3 className="text-lg font-medium">{viewingItem.title}</h3>
                    <p className="text-sm text-gray-600">{viewingItem.description}</p>
                  </div>
                  
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-medium">Reported For</h4>
                    <div className="mt-1 flex items-center">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                      <span>
                        {reportReasons[viewingItem.reportReason as keyof typeof reportReasons] || viewingItem.reportReason}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      "{viewingItem.reportDescription}"
                    </p>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Reported by: {viewingItem.reportedBy}</span>
                    <span>
                      {new Date(viewingItem.reportedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <label htmlFor="review-note" className="block text-sm font-medium mb-2">
                  Moderation Notes
                </label>
                <textarea
                  id="review-note"
                  className="w-full border border-gray-300 rounded-md p-3 h-24"
                  placeholder="Add your review notes here..."
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleModerateItem('approve')}
              >
                <Check className="mr-2 h-4 w-4" />
                Approve Content
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleModerateItem('remove')}
              >
                <X className="mr-2 h-4 w-4" />
                Remove Content
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminModerationPage;
