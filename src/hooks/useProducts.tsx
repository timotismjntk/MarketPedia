import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, mockProducts } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/hooks/useNotifications';

// Define types for products context
type ProductStatus = 'active' | 'pending' | 'rejected';

interface ProductWithStatus extends Product {
  status: ProductStatus;
  seller: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductsContextType {
  products: ProductWithStatus[];
  addProduct: (product: Omit<ProductWithStatus, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateProduct: (id: string, updates: Partial<ProductWithStatus>) => void;
  deleteProduct: (id: string) => void;
  approveProduct: (id: string) => void;
  rejectProduct: (id: string) => void;
  getSellerProducts: (sellerId: string) => ProductWithStatus[];
  getPendingProducts: () => ProductWithStatus[];
  getActiveProducts: () => ProductWithStatus[];
  getRejectedProducts: () => ProductWithStatus[];
  getProductById: (id: string) => ProductWithStatus | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  
  // Initialize with mock data and any saved products
  const [products, setProducts] = useState<ProductWithStatus[]>(() => {
    // Attempt to load products from localStorage
    const savedProducts = localStorage.getItem('appProducts');
    
    if (savedProducts) {
      try {
        return JSON.parse(savedProducts);
      } catch (e) {
        console.error('Failed to parse saved products', e);
        // If there's an error, initialize with mock products
        return mockProducts.map(product => ({
          ...product,
          status: product.status || 'active',
          sellerId: product.seller === 'TechGadgets' ? 'seller1' : 
                   product.seller === 'StyleHub' ? 'seller2' : 'unknown',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
      }
    } else {
      // Initialize with mock products
      return mockProducts.map(product => ({
        ...product,
        status: product.status || 'active',
        sellerId: product.seller === 'TechGadgets' ? 'seller1' : 
                 product.seller === 'StyleHub' ? 'seller2' : 'unknown',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }
  });
  
  // Save products to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('appProducts', JSON.stringify(products));
  }, [products]);
  
  const addProduct = (product: Omit<ProductWithStatus, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const now = new Date().toISOString();
    const newProduct: ProductWithStatus = {
      ...product,
      id: `prod-${Date.now()}`,
      status: 'pending', // New products start as pending
      createdAt: now,
      updatedAt: now
    };
    
    setProducts(prev => [...prev, newProduct]);
    
    toast({
      title: "Product submitted",
      description: "Your product has been submitted for review.",
    });
    
    // Notify admin about new product
    addNotification({
      type: 'product-submitted',
      title: 'New Product Submitted',
      message: `${product.name} has been submitted for review by ${product.seller}.`,
      metadata: { productId: newProduct.id }
    });
  };
  
  const updateProduct = (id: string, updates: Partial<ProductWithStatus>) => {
    setProducts(prev => prev.map(product => {
      if (product.id === id) {
        return { 
          ...product, 
          ...updates,
          status: updates.status || product.status,
          updatedAt: new Date().toISOString() 
        };
      }
      return product;
    }));
    
    toast({
      title: "Product updated",
      description: "Your product has been updated successfully.",
    });
  };
  
  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    
    toast({
      title: "Product deleted",
      description: "Your product has been deleted successfully.",
    });
  };
  
  const approveProduct = (id: string) => {
    const productToApprove = products.find(p => p.id === id);
    
    if (!productToApprove) return;
    
    updateProduct(id, { status: 'active' });
    
    // Notify seller about approved product
    addNotification({
      type: 'product-approved',
      title: 'Product Approved',
      message: `Your product "${productToApprove.name}" has been approved and is now active.`,
      metadata: { productId: id, sellerId: productToApprove.sellerId }
    });
  };
  
  const rejectProduct = (id: string) => {
    const productToReject = products.find(p => p.id === id);
    
    if (!productToReject) return;
    
    updateProduct(id, { status: 'rejected' });
    
    // Notify seller about rejected product
    addNotification({
      type: 'product-rejected',
      title: 'Product Rejected',
      message: `Your product "${productToReject.name}" has been rejected. Please review and resubmit.`,
      metadata: { productId: id, sellerId: productToReject.sellerId }
    });
  };
  
  const getSellerProducts = (sellerId: string) => {
    return products.filter(product => product.sellerId === sellerId);
  };
  
  const getPendingProducts = () => {
    return products.filter(product => product.status === 'pending');
  };
  
  const getActiveProducts = () => {
    return products.filter(product => product.status === 'active');
  };
  
  const getRejectedProducts = () => {
    return products.filter(product => product.status === 'rejected');
  };
  
  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };
  
  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      approveProduct,
      rejectProduct,
      getSellerProducts,
      getPendingProducts,
      getActiveProducts,
      getRejectedProducts,
      getProductById
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
