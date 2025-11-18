import React, { useState } from 'react';
import FlatmateCard from './FlatmateCard';
import { Users } from 'lucide-react';
import FlatmatesFilterModal from './FlatMatesFilterModal';

const FlatmatesList = ({ searchParams = { location: '', gender: '', budget: '' } }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    gender: '',
    ageRange: '',
    occupation: '',
    preferences: []
  });

  // Sample flatmate data
  const allFlatmates = [
    {
      id: 1,
      name: 'John Doe',
      age: 28,
      gender: 'male',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      location: 'Lekki, Lagos',
      budget: 85000,
      occupation: 'professional',
      lookingFor: 'Roommate',
      verified: true,
      preferences: ['Non-smoker', 'Quiet', 'Clean'],
      availableFrom: 'Jan 2025'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 24,
      gender: 'female',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
      location: 'Victoria Island, Lagos',
      budget: 65000,
      occupation: 'student',
      lookingFor: 'Room',
      verified: true,
      preferences: ['Pet-friendly', 'Social', 'Clean'],
      availableFrom: 'Feb 2025'
    },
    {
      id: 3,
      name: 'Mike Chen',
      age: 30,
      gender: 'male',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop',
      location: 'Ikoyi, Lagos',
      budget: 120000,
      occupation: 'entrepreneur',
      lookingFor: 'Apartment Share',
      verified: true,
      preferences: ['Night Owl', 'Social', 'Pet-friendly'],
      availableFrom: 'Immediate'
    },
    {
      id: 4,
      name: 'Emily Williams',
      age: 26,
      gender: 'female',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
      location: 'Ajah, Lagos',
      budget: 45000,
      occupation: 'professional',
      lookingFor: 'Roommate',
      verified: false,
      preferences: ['Non-smoker', 'Quiet'],
      availableFrom: 'Mar 2025'
    },
    {
      id: 5,
      name: 'David Brown',
      age: 32,
      gender: 'male',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
      location: 'Ikeja, Lagos',
      budget: 95000,
      occupation: 'professional',
      lookingFor: 'Room',
      verified: true,
      preferences: ['Clean', 'Quiet', 'Non-smoker'],
      availableFrom: 'Jan 2025'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      age: 23,
      gender: 'female',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop',
      location: 'Surulere, Lagos',
      budget: 55000,
      occupation: 'student',
      lookingFor: 'Roommate',
      verified: true,
      preferences: ['Social', 'Pet-friendly'],
      availableFrom: 'Feb 2025'
    },
    {
      id: 7,
      name: 'James Wilson',
      age: 29,
      gender: 'male',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop',
      location: 'Banana Island, Lagos',
      budget: 150000,
      occupation: 'entrepreneur',
      lookingFor: 'Apartment Share',
      verified: true,
      preferences: ['Social', 'Night Owl'],
      availableFrom: 'Immediate'
    },
    {
      id: 8,
      name: 'Rachel Green',
      age: 27,
      gender: 'female',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop',
      location: 'Berger, Lagos',
      budget: 70000,
      occupation: 'professional',
      lookingFor: 'Room',
      verified: false,
      preferences: ['Clean', 'Quiet'],
      availableFrom: 'Mar 2025'
    }
  ];

  // Filter flatmates based on search params and advanced filters
  const filteredFlatmates = allFlatmates.filter(flatmate => {
    // Search: Location filter
    if (searchParams.location) {
      const searchLocation = searchParams.location.toLowerCase();
      if (!flatmate.location.toLowerCase().includes(searchLocation)) {
        return false;
      }
    }

    // Search: Gender filter
    if (searchParams.gender && searchParams.gender !== 'any') {
      if (flatmate.gender !== searchParams.gender) return false;
    }

    // Search: Budget filter
    if (searchParams.budget) {
      if (searchParams.budget === '100000+') {
        if (flatmate.budget < 100000) return false;
      } else {
        const [min, max] = searchParams.budget.split('-').map(Number);
        if (flatmate.budget < min || flatmate.budget > max) return false;
      }
    }

    // Advanced Filter: Budget range filter
    if (flatmate.budget < filters.priceRange[0] || flatmate.budget > filters.priceRange[1]) {
      return false;
    }

    // Advanced Filter: Gender filter
    if (filters.gender && filters.gender !== 'any') {
      if (flatmate.gender !== filters.gender && filters.gender !== 'mixed') return false;
    }

    // Advanced Filter: Age Range filter
    if (filters.ageRange) {
      const age = flatmate.age;
      if (filters.ageRange === '18-25' && (age < 18 || age > 25)) return false;
      if (filters.ageRange === '26-35' && (age < 26 || age > 35)) return false;
      if (filters.ageRange === '36-45' && (age < 36 || age > 45)) return false;
      if (filters.ageRange === '46+' && age < 46) return false;
    }

    // Advanced Filter: Occupation filter
    if (filters.occupation) {
      if (flatmate.occupation !== filters.occupation) return false;
    }

    // Advanced Filter: Preferences filter
    if (filters.preferences.length > 0) {
      const hasAllPreferences = filters.preferences.every(pref => 
        flatmate.preferences.includes(pref)
      );
      if (!hasAllPreferences) return false;
    }

    return true;
  });

  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };

  return (
    <div className="bg-gray-50 dark:bg-neutral-900 transition-colors">
      <div className="flex">
        {/* Filter Sidebar */}
        <FlatmatesFilterModal 
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApplyFilter={handleApplyFilter}
        />

        {/* Main Content */}
        <div className="flex-1 py-8 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Find Flatmates
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {filteredFlatmates.length} flatmates found
                </p>
              </div>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {isFilterOpen ? 'Hide Filter' : 'Filter'}
                </span>
              </button>
            </div>

            {/* Flatmate Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFlatmates.map((flatmate) => (
                <FlatmateCard key={flatmate.id} flatmate={flatmate} />
              ))}
            </div>

            {/* No Results */}
            {filteredFlatmates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No flatmates match your criteria.
                </p>
                <button
                  onClick={() => setFilters({ priceRange: [0, 500000], gender: '', ageRange: '', occupation: '', preferences: [] })}
                  className="mt-4 text-teal-600 dark:text-teal-400 border p-3 rounded-lg font-medium hover:text-teal-700 dark:hover:text-teal-300"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* View More Button */}
            {filteredFlatmates.length > 0 && (
              <div className="flex justify-center mt-8 md:justify-end">
                <button className="py-3 text-teal-600 dark:text-white dark:hover:text-teal-500 transition-colors">
                  View More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatmatesList;