
import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Wallet, DollarSign, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type PaymentMethod = 'credit-card' | 'e-wallet' | 'bank-transfer' | 'cod';
type EWallet = 'OVO' | 'DANA' | 'GoPay' | '';

interface PaymentDetails {
  address: any;  // Using any for brevity, could be properly typed
  shippingMethod: string;
  shippingCost: number;
  total: number;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [selectedWallet, setSelectedWallet] = useState<EWallet>('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [checkoutDetails, setCheckoutDetails] = useState<PaymentDetails | null>(null);
  
  // Load checkout details from localStorage
  useEffect(() => {
    const savedDetails = localStorage.getItem('checkoutDetails');
    if (savedDetails) {
      setCheckoutDetails(JSON.parse(savedDetails));
    }
  }, []);
  
  // If no checkout details, use default shipping cost
  const shippingCost = checkoutDetails?.shippingCost || 5;
  const total = subtotal + shippingCost;
  
  const handlePayment = () => {
    // Validate e-wallet selection
    if (paymentMethod === 'e-wallet' && !selectedWallet) {
      toast({
        title: "Please select an e-wallet",
        description: "You need to select an e-wallet to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      clearCart();
      
      // Create a mock order in localStorage
      const orderId = 'ORD-' + Date.now();
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        id: orderId,
        items,
        total,
        shippingCost,
        status: 'processing',
        paymentMethod,
        paymentDetails: paymentMethod === 'e-wallet' ? selectedWallet : null,
        date: new Date().toISOString(),
        address: checkoutDetails?.address || null,
        shippingMethod: checkoutDetails?.shippingMethod || 'standard',
      };
      
      // Add to orders array and save back to localStorage
      existingOrders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      toast({
        title: 'Payment Successful',
        description: 'Your order has been placed successfully!',
      });
      
      navigate('/orders');
    }, 2000);
  };
  
  const handleWalletSelect = (wallet: EWallet) => {
    setSelectedWallet(wallet);
  };
  
  return (
    <div className="app-container px-4 pt-4 pb-24">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/checkout')}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Payment</h1>
      </div>
      
      <div className="space-y-6">
        {/* Payment Method Selection */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <h2 className="font-medium mb-4">Select Payment Method</h2>
          
          <div className="space-y-3">
            <label className="flex items-center p-3 border rounded-lg cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'credit-card'}
                onChange={() => setPaymentMethod('credit-card')}
                className="mr-3"
              />
              <CreditCard className="text-primary mr-3" size={20} />
              <span>Credit/Debit Card</span>
            </label>
            
            <label className="flex items-center p-3 border rounded-lg cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'e-wallet'}
                onChange={() => setPaymentMethod('e-wallet')}
                className="mr-3"
              />
              <Smartphone className="text-primary mr-3" size={20} />
              <span>E-Wallet (OVO, DANA, GoPay)</span>
            </label>
            
            <label className="flex items-center p-3 border rounded-lg cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'bank-transfer'}
                onChange={() => setPaymentMethod('bank-transfer')}
                className="mr-3"
              />
              <Wallet className="text-primary mr-3" size={20} />
              <span>Virtual Account / Bank Transfer</span>
            </label>
            
            <label className="flex items-center p-3 border rounded-lg cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="mr-3"
              />
              <DollarSign className="text-primary mr-3" size={20} />
              <span>Cash on Delivery (COD)</span>
            </label>
          </div>
        </div>
        
        {/* Payment Details */}
        {paymentMethod === 'credit-card' && (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h2 className="font-medium mb-4">Card Details</h2>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                />
              </div>
              
              <div className="flex space-x-3">
                <div className="flex-1">
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  />
                </div>
                
                <div className="flex-1">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <input
                  id="nameOnCard"
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                />
              </div>
            </div>
          </div>
        )}
        
        {paymentMethod === 'e-wallet' && (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h2 className="font-medium mb-4">Select E-Wallet</h2>
            
            <div className="grid grid-cols-3 gap-3">
              <button 
                className={`p-3 border rounded-lg flex flex-col items-center justify-center relative ${
                  selectedWallet === 'OVO' ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => handleWalletSelect('OVO')}
              >
                <div className="w-10 h-10 bg-purple-500 rounded-full mb-2 flex items-center justify-center text-white font-bold">
                  OVO
                </div>
                <span className="text-sm">OVO</span>
                {selectedWallet === 'OVO' && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
              
              <button 
                className={`p-3 border rounded-lg flex flex-col items-center justify-center relative ${
                  selectedWallet === 'DANA' ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => handleWalletSelect('DANA')}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full mb-2 flex items-center justify-center text-white font-bold">
                  DANA
                </div>
                <span className="text-sm">DANA</span>
                {selectedWallet === 'DANA' && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
              
              <button 
                className={`p-3 border rounded-lg flex flex-col items-center justify-center relative ${
                  selectedWallet === 'GoPay' ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => handleWalletSelect('GoPay')}
              >
                <div className="w-10 h-10 bg-green-500 rounded-full mb-2 flex items-center justify-center text-white font-bold">
                  GP
                </div>
                <span className="text-sm">GoPay</span>
                {selectedWallet === 'GoPay' && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            </div>
            
            {selectedWallet && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Payment Instructions</h3>
                <ol className="text-xs text-gray-600 list-decimal list-inside space-y-1">
                  <li>Open your {selectedWallet} app</li>
                  <li>Scan the QR code that will appear after clicking "Pay"</li>
                  <li>Confirm payment in your app</li>
                  <li>Wait for confirmation</li>
                </ol>
              </div>
            )}
          </div>
        )}
        
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <h2 className="font-medium mb-3">Order Summary</h2>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal ({items.length} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-100 my-2 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <Button 
          className="w-full"
          onClick={handlePayment}
          disabled={loading || (paymentMethod === 'e-wallet' && !selectedWallet)}
        >
          {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
