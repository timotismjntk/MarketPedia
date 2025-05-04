
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Image, DollarSign, FileText, Package } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { categories } from '@/lib/mockData';
import { Label } from '@/components/ui/label';

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
  product?: any;
}

const ProductFormDialog: React.FC<ProductFormDialogProps> = ({
  open,
  onClose,
  onSave,
  product
}) => {
  const [imagePreview, setImagePreview] = useState('/placeholder.svg');
  
  const form = useForm({
    defaultValues: {
      name: '',
      price: '',
      image: '/placeholder.svg',
      description: '',
      category: 'Electronics',
      inStock: true
    }
  });
  
  // When product changes (editing vs adding), reset the form
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        price: product.price.toString(),
        image: product.image,
        description: product.description,
        category: product.category,
        inStock: product.inStock
      });
      setImagePreview(product.image);
    } else {
      form.reset({
        name: '',
        price: '',
        image: '/placeholder.svg',
        description: '',
        category: 'Electronics',
        inStock: true
      });
      setImagePreview('/placeholder.svg');
    }
  }, [product, form]);

  const handleSubmit = form.handleSubmit((data) => {
    // Convert price string to number
    const productData = {
      ...data,
      price: parseFloat(data.price)
    };
    
    onSave(productData);
  });

  // Handle image upload (mock functionality)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just use a placeholder
      setImagePreview('/placeholder.svg');
      form.setValue('image', '/placeholder.svg');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md">
              <img 
                src={imagePreview} 
                alt="Product preview" 
                className="h-40 w-40 object-contain mb-4" 
              />
              <div className="flex items-center">
                <Label htmlFor="image-upload" className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-l-md flex items-center">
                  <Image className="h-4 w-4 mr-2" />
                  Choose Image
                </Label>
                <Input 
                  id="image-upload"
                  type="file" 
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <span className="bg-gray-50 border px-4 py-2 rounded-r-md text-sm text-gray-500">
                  Max size: 2MB
                </span>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input type="number" step="0.01" min="0" placeholder="0.00" className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        {categories.filter(cat => cat !== 'All').map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea 
                        placeholder="Enter product description" 
                        className="pl-9 min-h-[100px]"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4" />
                    <Label htmlFor="inStock">Product is in stock</Label>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="mr-2">
                Cancel
              </Button>
              <Button type="submit">
                {product ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
