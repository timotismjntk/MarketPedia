
import React from 'react';
import ProductList from '@/components/products/ProductList';
import { Product } from '@/lib/mockData';

interface SellerProductSectionProps {
  products: Product[];
  onClearFilters: () => void;
}

const SellerProductSection: React.FC<SellerProductSectionProps> = ({
  products,
  onClearFilters
}) => {
  return (
    <div className="px-4">
      <ProductList 
        products={products}
        title={`${products.length} Products`} 
      />
      
      {products.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found matching your criteria.</p>
          <button 
            className="mt-2 text-primary hover:underline"
            onClick={onClearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SellerProductSection;
