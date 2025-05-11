
import React, { useState, useEffect } from 'react';
import { MessageCircleMore, Bell } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';
import ProductList from '@/components/products/ProductList';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { mockProducts, categories, mockLiveStreams } from '@/lib/mockData';
import LiveStreamPopup from '@/components/live/LiveStreamPopup';

const filterOptions = [
  { label: 'All Products', value: 'all' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Best Rating', value: 'rating' },
];

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [products, setProducts] = useState(mockProducts);
  const [randomLiveStream, setRandomLiveStream] = useState(null);
  const [showLivePopup, setShowLivePopup] = useState(true);

  // Only get live streams that are actually live
  const activeLiveStreams = mockLiveStreams.filter(stream => stream.isLive);
  
  useEffect(() => {
    if (activeLiveStreams.length > 0 && showLivePopup) {
      // Set a random live stream for popup
      const randomIndex = Math.floor(Math.random() * activeLiveStreams.length);
      setRandomLiveStream(activeLiveStreams[randomIndex]);
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Filter products based on search query
    if (query.trim() === '') {
      // Reset to original products if search is empty
      setProducts(mockProducts);
    } else {
      const filtered = mockProducts.filter(
        product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
      toast({
        title: `Search results`,
        description: `Found ${filtered.length} products for "${query}"`,
      });
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Apply category filter
    if (category === 'All') {
      setProducts(mockProducts);
    } else {
      const filtered = mockProducts.filter(product => product.category === category);
      setProducts(filtered);
    }
  };

  const handleFilterChange = (filterValue: string) => {
    setSelectedFilter(filterValue);
    
    // Apply selected sort/filter
    let sortedProducts = [...products];
    
    switch(filterValue) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        toast({
          description: "Products sorted by price: low to high",
        });
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        toast({
          description: "Products sorted by price: high to low",
        });
        break;
      case 'newest':
        // In a real app, we'd use creation date
        // For mock data, we'll just use the array in reverse
        sortedProducts.reverse();
        toast({
          description: "Products sorted by newest first",
        });
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        toast({
          description: "Products sorted by highest rating",
        });
        break;
      default:
        // Reset to original sort
        sortedProducts = mockProducts;
    }
    
    setProducts(sortedProducts);
  };

  return (
    <div className="app-container px-4 pt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row items-center">
          <img
            src="src/assets/image/martpedia-tanpa-title.png"
            className="w-16 h-16 object-contain"
          />
          <h1 className="text-2xl font-bold text-gray-900 -mt-3 -ml-2">
            MartPedia
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to={`/notifications`}>
            <button className="p-2 text-gray-600 relative">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
          </Link>
          <Link to={`/chat`}>
            <button className="p-2 text-gray-600 relative">
              <MessageCircleMore size={24} />
              {/* Badge with message count */}
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                2
              </span>
            </button>
          </Link>
        </div>
      </div>
      
      <SearchBar 
        onSearch={handleSearch}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
      />
      
      <div className="my-4 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          <button
            key="all"
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm ${
              selectedCategory === 'All' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleCategoryChange('All')}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm ${
                category === selectedCategory 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="bg-primary/10 rounded-xl p-4 relative overflow-hidden">
          <div className="w-3/4">
            <h2 className="text-xl font-bold mb-2">Summer Sale!</h2>
            <p className="text-gray-700 mb-4">Get up to 50% off on selected items</p>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
              Shop Now
            </button>
          </div>
          <div className="absolute right-0 bottom-0 h-full w-1/3 bg-primary/20 rounded-l-full"></div>
        </div>
      </div>
      
      <ProductList 
        products={products.slice(0, 4)} 
        title="Featured Products" 
      />
      
      <ProductList 
        products={products.slice(4)} 
        title="New Arrivals" 
      />

      {/* Random Live Stream Popup */}
      {randomLiveStream && showLivePopup && (
        <LiveStreamPopup 
          stream={randomLiveStream}
          onClose={() => setShowLivePopup(false)}
        />
      )}
    </div>
  );
};

export default Index;
