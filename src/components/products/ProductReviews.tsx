
import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';

interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  response?: string;
  images: string[];
}

interface ProductReviewsProps {
  productId: string;
  initialReviews?: Review[];
}

// Mock reviews for demo purposes
const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: 'u1',
    userName: 'Ahmad Rasyid',
    userAvatar: '/placeholder.svg',
    rating: 4,
    comment: 'Kualitas suaranya bagus, pas di telinga, dan baterai tahan lama.',
    date: '2023-05-10',
    helpful: 3,
    response: 'Terima kasih atas review positifnya! Kami senang Anda menikmati produk kami.',
    images: ['/placeholder.svg']
  },
  {
    id: '2',
    productId: '1',
    userId: 'u2',
    userName: 'Siti Nuraini',
    userAvatar: '/placeholder.svg',
    rating: 5,
    comment: 'Sangat puas dengan kualitas suara dan fiturnya. Pengiriman juga cepat!',
    date: '2023-05-08',
    helpful: 7,
    images: []
  },
  {
    id: '3',
    productId: '1',
    userId: 'u3',
    userName: 'Budi Santoso',
    rating: 3,
    comment: 'Produknya cukup bagus, tapi ada sedikit masalah dengan konektivitas Bluetooth.',
    date: '2023-05-05',
    helpful: 2,
    response: 'Mohon maaf atas ketidaknyamanannya. Silakan hubungi customer service kami untuk bantuan teknis.',
    images: ['/placeholder.svg']
  }
];

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, initialReviews = mockReviews }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : '0.0';
  
  // Rating distribution
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });
  
  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };
  
  const handleHelpfulClick = (reviewId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to mark reviews as helpful",
        variant: "destructive"
      });
      return;
    }
    
    const updatedReviews = reviews.map(review => 
      review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
    );
    
    setReviews(updatedReviews);
    toast({
      title: "Marked as helpful",
      description: "Thank you for your feedback"
    });
  };
  
  const handleSubmitReview = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to submit a review",
        variant: "destructive"
      });
      return;
    }
    
    if (userRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting",
        variant: "destructive"
      });
      return;
    }
    
    if (!userReview.trim()) {
      toast({
        title: "Review Required",
        description: "Please write a review before submitting",
        variant: "destructive"
      });
      return;
    }
    
    // Create new review
    const newReview: Review = {
      id: `new-${Date.now()}`,
      productId,
      userId: user.id,
      userName: user.name || 'Anonymous',
      userAvatar: user.avatar,
      rating: userRating,
      comment: userReview,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      images: []
    };
    
    // Add review to list
    setReviews([newReview, ...reviews]);
    
    // Reset form
    setUserReview('');
    setUserRating(0);
    
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!"
    });
  };
  
  // Render stars for rating display
  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={interactive ? 24 : 16} 
            className={`${
              (interactive && (star <= hoverRating || (!hoverRating && star <= userRating))) || 
              (!interactive && star <= rating)
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            } ${interactive ? "cursor-pointer" : ""}`} 
            onClick={interactive ? () => handleRatingClick(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Reviews & Ratings</h2>
      
      {/* Summary */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row">
            {/* Average rating */}
            <div className="flex-1 flex flex-col items-center justify-center mb-4 md:mb-0 md:border-r border-gray-200">
              <div className="text-4xl font-bold">{averageRating}</div>
              <div className="flex mt-2">{renderStars(parseFloat(averageRating))}</div>
              <div className="text-sm text-gray-500 mt-1">from {reviews.length} reviews</div>
            </div>
            
            {/* Rating distribution */}
            <div className="flex-1 pl-0 md:pl-6">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center mb-1">
                  <span className="w-3">{rating}</span>
                  <Star size={14} className="ml-1 mr-2 fill-yellow-400 text-yellow-400" />
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-yellow-400 h-2.5 rounded-full" 
                      style={{ 
                        width: `${reviews.length > 0 ? (ratingCounts[rating - 1] / reviews.length * 100) : 0}%` 
                      }} 
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-500">{ratingCounts[rating - 1]}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start">
                  {/* User avatar */}
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                    {review.userAvatar ? (
                      <img 
                        src={review.userAvatar} 
                        alt={review.userName} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  {/* Review details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{review.userName}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex my-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700 my-2">{review.comment}</p>
                    
                    {/* Review images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex space-x-2 my-2">
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
                        <p className="text-sm font-medium mb-1">Seller Response:</p>
                        <p className="text-sm text-gray-700">{review.response}</p>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center mt-3 text-sm">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center text-gray-500 hover:text-gray-700"
                        onClick={() => handleHelpfulClick(review.id)}
                      >
                        <ThumbsUp className="mr-1" size={14} />
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <MessageCircle className="mx-auto mb-3 text-gray-400" size={48} />
            <h3 className="text-lg font-medium text-gray-800">No reviews yet</h3>
            <p className="text-gray-500 mt-1">Be the first to review this product</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
