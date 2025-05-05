
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  ArrowLeft,
  MapPin,
  CreditCard,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Define schemas and types
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }).optional(),
});

const addressSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }),
  street: z.string().min(5, {
    message: "Street address must be at least 5 characters."
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters."
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters."
  }),
  zipCode: z.string().min(4, {
    message: "ZIP code must be at least 4 characters."
  }),
  isDefault: z.boolean().default(false),
});

const paymentMethodSchema = z.object({
  id: z.string(),
  type: z.enum(['credit-card', 'e-wallet', 'bank-transfer']),
  name: z.string().min(2),
  details: z.string().min(4),
  isDefault: z.boolean().default(false),
});

type Address = z.infer<typeof addressSchema>;
type PaymentMethod = z.infer<typeof paymentMethodSchema>;

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Mock data for stored addresses and payment methods
const initialAddresses: Address[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1 123-456-7890',
    street: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true,
  },
  {
    id: '2',
    name: 'John Doe',
    phone: '+1 123-456-7890',
    street: '456 Park Avenue',
    city: 'Boston',
    state: 'MA',
    zipCode: '02108',
    isDefault: false,
  }
];

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit-card',
    name: 'Visa ending in 4242',
    details: '**** **** **** 4242',
    isDefault: true,
  },
  {
    id: '2',
    type: 'e-wallet',
    name: 'OVO',
    details: 'ovo@example.com',
    isDefault: false,
  }
];

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [addresses, setAddresses] = useState<Address[]>(
    JSON.parse(localStorage.getItem('userAddresses') || JSON.stringify(initialAddresses))
  );
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    JSON.parse(localStorage.getItem('userPaymentMethods') || JSON.stringify(initialPaymentMethods))
  );
  
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null);
  
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
    },
  });
  
  useEffect(() => {
    // Save addresses to localStorage when they change
    localStorage.setItem('userAddresses', JSON.stringify(addresses));
  }, [addresses]);
  
  useEffect(() => {
    // Save payment methods to localStorage when they change
    localStorage.setItem('userPaymentMethods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const onSubmit = (values: ProfileFormValues) => {
    // Update the user profile 
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    
    navigate('/profile');
  };
  
  const handleAddAddress = () => {
    setEditingAddress({
      id: Date.now().toString(),
      name: user?.name || '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: addresses.length === 0,
    });
    setShowAddressForm(true);
  };
  
  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };
  
  const handleSaveAddress = (address: Address) => {
    if (address.isDefault) {
      // Unset default for all other addresses
      setAddresses(prevAddresses => 
        prevAddresses.map(a => ({...a, isDefault: false}))
      );
    }
    
    if (editingAddress.id) {
      // Update existing address
      setAddresses(prevAddresses => 
        prevAddresses.map(a => a.id === address.id ? address : a)
      );
    } else {
      // Add new address
      setAddresses(prevAddresses => [...prevAddresses, address]);
    }
    
    setEditingAddress(null);
    setShowAddressForm(false);
    
    toast({
      title: "Address saved",
      description: "Your address has been saved successfully.",
    });
  };
  
  const handleDeleteAddress = (id: string) => {
    setAddresses(prevAddresses => prevAddresses.filter(a => a.id !== id));
    
    toast({
      title: "Address deleted",
      description: "Your address has been deleted successfully.",
    });
  };
  
  const handleAddPaymentMethod = () => {
    setEditingPayment({
      id: Date.now().toString(),
      type: 'credit-card',
      name: '',
      details: '',
      isDefault: paymentMethods.length === 0,
    });
    setShowPaymentForm(true);
  };
  
  const handleEditPayment = (payment: PaymentMethod) => {
    setEditingPayment(payment);
    setShowPaymentForm(true);
  };
  
  const handleSavePayment = (payment: PaymentMethod) => {
    if (payment.isDefault) {
      // Unset default for all other payment methods
      setPaymentMethods(prevMethods => 
        prevMethods.map(p => ({...p, isDefault: false}))
      );
    }
    
    if (editingPayment.id) {
      // Update existing payment method
      setPaymentMethods(prevMethods => 
        prevMethods.map(p => p.id === payment.id ? payment : p)
      );
    } else {
      // Add new payment method
      setPaymentMethods(prevMethods => [...prevMethods, payment]);
    }
    
    setEditingPayment(null);
    setShowPaymentForm(false);
    
    toast({
      title: "Payment method saved",
      description: "Your payment method has been saved successfully.",
    });
  };
  
  const handleDeletePayment = (id: string) => {
    setPaymentMethods(prevMethods => prevMethods.filter(p => p.id !== id));
    
    toast({
      title: "Payment method deleted",
      description: "Your payment method has been deleted successfully.",
    });
  };
  
  return (
    <div className="app-container px-4 pt-4 pb-20">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Edit Profile</h1>
      </div>
      
      {/* Profile Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User size={32} className="text-primary" />
              )}
            </div>
            <button type="button" className="text-sm text-primary">Change Photo</button>
          </div>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 123-456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">
            Save Profile
          </Button>
        </form>
      </Form>
      
      {/* Addresses */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Delivery Addresses</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddAddress}
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            <span>Add</span>
          </Button>
        </div>
        
        {addresses.length > 0 ? (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div 
                key={address.id}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <h3 className="font-medium">{address.name}</h3>
                    {address.isDefault && (
                      <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditAddress(address)}
                      className="text-sm text-gray-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-sm text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                <p className="text-sm text-gray-600">{address.street}</p>
                <p className="text-sm text-gray-600">
                  {address.city}, {address.state} {address.zipCode}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 border border-dashed border-gray-300 rounded-lg">
            <MapPin className="text-gray-400 mb-2" size={24} />
            <p className="text-gray-500 mb-4">No addresses added yet</p>
            <Button variant="outline" onClick={handleAddAddress}>
              Add Address
            </Button>
          </div>
        )}
      </div>
      
      {/* Payment Methods */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Payment Methods</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddPaymentMethod}
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            <span>Add</span>
          </Button>
        </div>
        
        {paymentMethods.length > 0 ? (
          <div className="space-y-3">
            {paymentMethods.map((payment) => (
              <div 
                key={payment.id}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <h3 className="font-medium">{payment.name}</h3>
                    {payment.isDefault && (
                      <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditPayment(payment)}
                      className="text-sm text-gray-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeletePayment(payment.id)}
                      className="text-sm text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center mt-1">
                  <CreditCard className="text-gray-400 mr-2" size={16} />
                  <span className="text-sm text-gray-600">{payment.details}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 border border-dashed border-gray-300 rounded-lg">
            <CreditCard className="text-gray-400 mb-2" size={24} />
            <p className="text-gray-500 mb-4">No payment methods added yet</p>
            <Button variant="outline" onClick={handleAddPaymentMethod}>
              Add Payment Method
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEditPage;
