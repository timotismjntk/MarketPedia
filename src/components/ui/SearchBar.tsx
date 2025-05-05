
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  showFilter?: boolean;
  onFilterClick?: () => void;
  filterOptions?: FilterOption[];
  onFilterChange?: (value: string) => void;
  selectedFilter?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  showFilter = true, 
  onFilterClick,
  filterOptions,
  onFilterChange,
  selectedFilter 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterClick = () => {
    if (onFilterClick) {
      onFilterClick();
    } else {
      setShowFilterDropdown(!showFilterDropdown);
    }
  };

  return (
    <div className="relative">
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
            onClick={handleFilterClick}
            className="p-2.5 ml-2 text-sm font-medium text-white bg-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Filter className="w-5 h-5" />
          </button>
        )}
      </form>
      
      {/* Filter dropdown */}
      {showFilterDropdown && filterOptions && onFilterChange && (
        <div className="absolute z-10 mt-1 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-48">
          <div className="py-1">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onFilterChange(option.value);
                  setShowFilterDropdown(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm rounded ${
                  selectedFilter === option.value
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
