
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  showFilter?: boolean;
  onFilterClick?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  showFilter = true, 
  onFilterClick 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="relative flex w-full items-center"
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </div>
        <input
          type="search"
          className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {showFilter && (
        <button
          type="button"
          onClick={onFilterClick}
          className="p-2.5 ml-2 text-sm font-medium text-white bg-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <Filter className="w-5 h-5" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
