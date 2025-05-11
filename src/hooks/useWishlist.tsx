
import { useState, useEffect, createContext, useContext } from 'react';
import { Product } from '@/lib/mockData';
import { useToast } from "@/components/ui/use-toast";

interface WishlistItemType {
  items: Product[];
  isProductInWishlist: (productId: Product) => boolean;
  addProductToWishlist: (product: Product) => void;
  removeProductFromWishlist: (productId: string) => void;
}
const WishlistItem = createContext<WishlistItemType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);
  const { toast } = useToast();
  
  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Failed to load wishlist from localStorage', error);
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage', error);
    }
  }, [items]);

  const isProductInWishlist = (product: Product) => {
    return items.some(item => item.id === product.id);
  }

  const addProductToWishlist = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.filter(item => item.id === product.id);
      } else {
        return prevItems.concat(product);
      }
    });
    
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`
    });
  };

  const removeProductFromWishlist = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
    
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist."
    });
  };

  return (
    <WishlistItem.Provider value={{
      items,
      isProductInWishlist,
      addProductToWishlist,
      removeProductFromWishlist,
    }}>
      {children}
    </WishlistItem.Provider>
  );
};

export const useWishlist = (): WishlistItemType => {
  const context = useContext(WishlistItem);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
