
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/mockData';

interface ProductListProps {
  products: Product[];
  title?: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, title }) => {
  if (products.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
