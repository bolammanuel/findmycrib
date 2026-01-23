import React, { useState } from 'react';
import { MapPin, Home, DollarSign, Search, User } from 'lucide-react';

const SearchFilters = ({ onSearch, activeTab }) => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [gender, setGender] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = () => {
    const searchParams = activeTab === 'shortlet' 
      ? {
          location: location.trim(),
          propertyType,
          priceRange
        }
      : {
          location: location.trim(),
          gender,
          budget
        };
    
    console.log('Search params:', searchParams);
    
    if (onSearch) {
      onSearch(searchParams);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-neutral-950 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border rounded-lg p-4 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-900 shadow-sm">
          {/* Location Input - Same for both */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors text-sm sm:text-base"
            />
          </div>

          {/* Conditional Fields based on activeTab */}
          {activeTab === 'shortlet' ? (
            <>
              {/* Property Type Dropdown */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Home className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer transition-colors text-sm sm:text-base"
                >
                  <option value="">Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="studio">Studio</option>
                  <option value="duplex">Duplex</option>
                </select>
              </div>

              {/* Price Range Dropdown */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer transition-colors text-sm sm:text-base"
                >
                  <option value="">Price Range</option>
                  <option value="0-50000">₦0 - ₦50,000</option>
                  <option value="50000-100000">₦50,000 - ₦100,000</option>
                  <option value="100000-200000">₦100,000 - ₦200,000</option>
                  <option value="200000-500000">₦200,000 - ₦500,000</option>
                  <option value="500000+">₦500,000+</option>
                </select>
              </div>
            </>
          ) : (
            <>
              {/* Gender Preference Dropdown */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer transition-colors text-sm sm:text-base"
                >
                  <option value="">Gender Preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="mixed">Mixed</option>
                  <option value="any">Any</option>
                </select>
              </div>

              {/* Budget Range Dropdown */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer transition-colors text-sm sm:text-base"
                >
                  <option value="">Budget Range</option>
                  <option value="0-50000">₦0 - ₦50,000</option>
                  <option value="50000-80000">₦50,000 - ₦80,000</option>
                  <option value="80000-120000">₦80,000 - ₦120,000</option>
                  <option value="120000-200000">₦120,000 - ₦200,000</option>
                  <option value="200000+">₦200,000+</option>
                </select>
              </div>
            </>
          )}

          {/* Search Button - Same for both */}
          <button
            onClick={handleSearch}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;