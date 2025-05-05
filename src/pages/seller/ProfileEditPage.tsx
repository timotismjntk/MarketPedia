
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  ArrowLeft,
  MapPin,
  Upload,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

// Define schema for seller profile form
const sellerProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Shop name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters."
  }),
  categories: z.string().array().min(1, {
    message: "Please select at least one category."
  }),
});

type SellerProfileFormValues = z.infer<typeof sellerProfileSchema>;

// Mock seller data
const mockSellerData = {
  id: 'seller1',
  name: 'TechGadgets',
  description: 'We sell the latest and greatest tech gadgets at affordable prices. Fast shipping and excellent customer service!',
  email: 'contact@techgadgets.com',
  phone: '+1 555-123-4567',
  avatar: '/placeholder.svg',
  coverImage: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
  location: 'Jakarta, Indonesia',
  categories: ['Electronics', 'Accessories', 'Gadgets']
};

const SellerProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(mockSellerData.avatar);
  const [coverPreview, setCoverPreview] = useState<string>(mockSellerData.coverImage);
  
  const form = useForm<SellerProfileFormValues>({
    resolver: zodResolver(sellerProfileSchema),
    defaultValues: {
      name: mockSellerData.name,
      description: mockSellerData.description,
      email: mockSellerData.email,
      phone: mockSellerData.phone,
      location: mockSellerData.location,
      categories: mockSellerData.categories,
    },
  });
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = (values: SellerProfileFormValues) => {
    // In a real app, this would update the seller profile in the database
    console.log('Updated seller profile:', values);
    console.log('Avatar file:', avatarFile);
    console.log('Cover image file:', coverImageFile);
    
    // Save to localStorage for demonstration
    localStorage.setItem('sellerProfile', JSON.stringify({
      ...values,
      avatar: avatarPreview,
      coverImage: coverPreview
    }));
    
    toast({
      title: "Profile updated",
      description: "Your seller profile has been updated successfully.",
    });
    
    navigate('/seller');
  };

  return (
    <div className="app-container px-4 pt-4 pb-20">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/seller')}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Edit Seller Profile</h1>
      </div>
      
      {/* Cover Image */}
      <div className="relative w-full h-48 bg-gray-200 rounded-lg mb-10 overflow-hidden">
        {coverPreview && (
          <img 
            src={coverPreview} 
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <label className="cursor-pointer">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleCoverImageChange}
              className="hidden"
            />
            <div className="flex flex-col items-center text-white">
              <Upload size={24} className="mb-2" />
              <span>Change Cover Image</span>
            </div>
          </label>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center -mt-16 mb-6">
            <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden mb-2">
              <img 
                src={avatarPreview} 
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="cursor-pointer text-sm text-primary">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              Change Logo
            </label>
          </div>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your shop name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your shop and products..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email</FormLabel>
                  <FormControl>
                    <Input placeholder="business@example.com" {...field} />
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
                  <FormLabel>Business Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 123-456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <Input placeholder="City, Country" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Category selection checkboxes would go here */}
          <div className="space-y-2">
            <FormLabel>Categories</FormLabel>
            <div className="flex flex-wrap gap-2">
              {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books', 'Toys', 'Accessories', 'Gadgets'].map((category) => (
                <label 
                  key={category} 
                  className={`px-3 py-1.5 rounded-full text-sm cursor-pointer ${
                    form.watch('categories').includes(category) 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={category}
                    className="sr-only"
                    checked={form.watch('categories').includes(category)}
                    onChange={(e) => {
                      const current = form.watch('categories');
                      if (e.target.checked) {
                        form.setValue('categories', [...current, category]);
                      } else {
                        form.setValue('categories', current.filter(c => c !== category));
                      }
                    }}
                  />
                  {category}
                </label>
              ))}
            </div>
            {form.formState.errors.categories && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.categories.message as string}
              </p>
            )}
          </div>
          
          <Button type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SellerProfileEditPage;
