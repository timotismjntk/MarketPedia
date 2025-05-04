
import React, { useState } from 'react';
import { Search, Star, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Mock review data
const mockReviews = [
  {
    id: '1',
    productId: '1',
    productName: 'Modern Wireless Earbuds',
    customerId: 'c1',
    customerName: 'Ahmad Rasyid',
    rating: 4,
    comment: 'Kualitas suaranya bagus, pas di telinga, dan baterai tahan lama.',
    date: '2023-05-10',
    response: '',
    images: ['/placeholder.svg']
  },
  {
    id: '2',
    productId: '3',
    productName: 'Smart Home Speaker',
    customerId: 'c2',
    customerName: 'Siti Nuraini',
    rating: 5,
    comment: 'Sangat puas dengan kualitas suara dan fiturnya. Sangat membantu aktivitas sehari-hari.',
    date: '2023-05-08',
    response: 'Terima kasih atas review positifnya! Kami senang Anda menikmati produk kami.',
    images: []
  },
  {
    id: '3',
    productId: '2',
    productName: 'Premium Cotton T-Shirt',
    customerId: 'c3',
    customerName: 'Budi Santoso',
    rating: 3,
    comment: 'Bahannya nyaman, tapi ukurannya agak kecil dari yang saya harapkan.',
    date: '2023-05-05',
    response: '',
    images: ['/placeholder.svg', '/placeholder.svg']
  },
  {
    id: '4',
    productId: '5',
    productName: 'Fitness Tracker Watch',
    customerId: 'c4',
    customerName: 'Dewi Lestari',
    rating: 2,
    comment: 'Pengukur detak jantung tidak akurat dan baterai cepat habis.',
    date: '2023-05-02',
    response: '',
    images: []
  }
];

interface ReviewResponse {
  reviewId: string;
  response: string;
}

const SellerReviewsPage = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState<typeof mockReviews[0] | null>(null);
  const [response, setResponse] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredReviews = reviews.filter(review => 
    review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRespondToReview = () => {
    if (!selectedReview || !response.trim()) return;

    const updatedReviews = reviews.map(review => 
      review.id === selectedReview.id ? { ...review, response } : review
    );
    
    setReviews(updatedReviews);
    setDialogOpen(false);
    setResponse('');
    
    toast({
      title: "Response sent",
      description: "Your response has been published successfully.",
    });
  };

  const openResponseDialog = (review: typeof mockReviews[0]) => {
    setSelectedReview(review);
    setResponse(review.response);
    setDialogOpen(true);
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={16} 
            className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Product Reviews</h1>
      
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
        <Input
          className="pl-10"
          placeholder="Search reviews by product, customer, or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{review.productName}</CardTitle>
                    <CardDescription>by {review.customerName} • {review.date}</CardDescription>
                  </div>
                  <div>
                    {renderStars(review.rating)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className="text-gray-700 mb-3">{review.comment}</p>
                
                {/* Review images if any */}
                {review.images.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review.images.map((img, i) => (
                      <div key={i} className="w-16 h-16 rounded overflow-hidden">
                        <img src={img} alt="Review" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Seller response */}
                {review.response && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium mb-1">Your Response:</p>
                    <p className="text-sm text-gray-700">{review.response}</p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant={review.response ? "outline" : "default"}
                  size="sm"
                  className="flex items-center"
                  onClick={() => openResponseDialog(review)}
                >
                  <MessageCircle className="mr-2" size={16} />
                  {review.response ? "Edit Response" : "Respond"}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <MessageCircle className="mx-auto mb-3 text-gray-400" size={48} />
            <h3 className="text-lg font-medium text-gray-800">No reviews found</h3>
            <p className="text-gray-500 mt-1">
              {searchTerm 
                ? "Try adjusting your search terms" 
                : "You don't have any reviews for your products yet"}
            </p>
          </div>
        )}
      </div>

      {/* Response Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Respond to Review</DialogTitle>
            <DialogDescription>
              Your response will be visible to all customers.
            </DialogDescription>
          </DialogHeader>
          
          {selectedReview && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{selectedReview.customerName}'s review</span>
                <div className="flex">{renderStars(selectedReview.rating)}</div>
              </div>
              <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-md">
                {selectedReview.comment}
              </p>
            </div>
          )}
          
          <Textarea
            placeholder="Write your response here..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[120px]"
          />
          
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleRespondToReview}>
              Publish Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerReviewsPage;
