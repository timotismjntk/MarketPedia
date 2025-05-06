
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SellerProductSearchProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SellerProductSearch: React.FC<SellerProductSearchProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="px-4 py-2 border-t border-b bg-gray-50">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={18} />
        </div>
        <input
          type="text"
          placeholder="Search in this shop..."
          className="pl-10 w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex overflow-x-auto gap-2 pb-2">
        <button
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm ${
            selectedCategory === 'All' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onCategoryChange('All')}
        >
          All
        </button>
        {categories.map((category: string, index: number) => (
          <button
            key={index}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm ${
              category === selectedCategory 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SellerProductSearch;
