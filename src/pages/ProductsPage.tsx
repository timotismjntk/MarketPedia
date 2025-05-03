
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { mockProducts, categories } from '@/lib/mockData';
import SearchBar from '@/components/ui/SearchBar';
import ProductList from '@/components/products/ProductList';

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter products based on search and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.seller.toLowerCase().includes(searchQuery.toLowerCase());
                           
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container px-4 pt-4">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => window.history.back()}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Browse Products</h1>
      </div>
      
      <SearchBar 
        onSearch={setSearchQuery} 
        onFilterClick={() => console.log('Filter clicked')}
      />
      
      <div className="my-4 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm ${
                category === selectedCategory 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <ProductList 
        products={filteredProducts} 
        title={`${filteredProducts.length} ${selectedCategory} Products`} 
      />
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found matching your criteria.</p>
          <button 
            className="mt-2 text-primary hover:underline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
