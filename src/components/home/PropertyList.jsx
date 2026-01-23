import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import { Home } from 'lucide-react';
import FilterModal from './FilterModal';
import { useListings } from '../../context/ListingsContext';

const PropertyList = ({ searchParams = { location: '', propertyType: '', priceRange: '' } }) => {
  const { properties: allProperties } = useListings();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    bedrooms: '',
    bathrooms: '',
    amenities: []
  });

  // Sample property data
  // const allProperties = [
  //   {
  //     id: 1,
  //     image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
  //     title: 'Modern Luxury Apartment',
  //     location: 'Lekki, Lagos',
  //     price: 205000,
  //     period: 'month',
  //     beds: 3,
  //     baths: 2,
  //     agent: 'Rebecca Bruce',
  //     featured: true,
  //     tag: 'For Sale',
  //     amenities: ['Wifi', 'Parking', 'Security']
  //   },
  //   {
  //     id: 2,
  //     image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
  //     title: 'Modern Luxury Apartment',
  //     location: 'Victoria Island, Lagos',
  //     price: 45000,
  //     period: 'month',
  //     beds: 2,
  //     baths: 2,
  //     agent: 'Rebecca Bruce',
  //     featured: false,
  //     tag: 'For Rent',
  //     amenities: ['Wifi', 'Generator']
  //   },
  //   {
  //     id: 3,
  //     image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
  //     title: 'Modern Luxury Apartment',
  //     location: 'Ikoyi, Lagos',
  //     price: 120000,
  //     period: 'month',
  //     beds: 3,
  //     baths: 3,
  //     agent: 'Rebecca Bruce',
  //     featured: true,
  //     tag: 'For Rent',
  //     amenities: ['Wifi', 'Parking', 'Pool', 'Gym']
  //   },
  //   {
  //     id: 4,
  //     image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
  //     title: 'Modern Luxury Apartment',
  //     location: 'Ajah, Lagos',
  //     price: 55000,
  //     period: 'month',
  //     beds: 2,
  //     baths: 3,
  //     agent: 'Rebecca Bruce',
  //     featured: false,
  //     tag: 'For Rent',
  //     amenities: ['Security', 'Generator']
  //   },
  //   {
  //     id: 5,
  //     image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
  //     title: 'Modern Luxury Apartment',
  //     location: 'Ikeja, Lagos',
  //     price: 87000,
  //     period: 'month',
  //     beds: 3,
  //     baths: 2,
  //     agent: 'Rebecca Bruce',
  //     featured: true,
  //     tag: 'For Sale',
  //     amenities: ['Wifi', 'Parking', 'Security', 'Generator']
  //   },
  //   {
  //     id: 6,
  //     image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop',
  //     title: 'Modern Luxury Apartment',
  //     location: 'Surulere, Lagos',
  //     price: 65000,
  //     period: 'month',
  //     beds: 2,
  //     baths: 3,
  //     agent: 'Rebecca Bruce',
  //     featured: true,
  //     tag: 'For Rent',
  //     amenities: ['Wifi', 'Parking']
  //   },
  //   {
  //     id: 7,
  //     image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
  //     title: 'Modern Luxury Apartment',
  //     location: 'Banana Island, Lagos',
  //     price: 90000,
  //     period: 'month',
  //     beds: 2,
  //     baths: 3,
  //     agent: 'Rebecca Bruce',
  //     featured: false,
  //     tag: 'For Sale',
  //     amenities: ['Wifi', 'Parking', 'Pool', 'Gym']
  //   },
  //   {
  //     id: 8,
  //     image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
  //     title: 'Modern Luxury Apartment',
  //     location: 'Berger, Lagos',
  //     price: 74000,
  //     period: 'month',
  //     beds: 2,
  //     baths: 2,
  //     agent: 'Rebecca Bruce',
  //     featured: true,
  //     tag: 'For Rent',
  //     amenities: ['Wifi', 'Parking', 'Security']
  //   },
  // ];

  // Filter properties based on search params and advanced filters
  const filteredProperties = allProperties.filter(property => {
    // Search: Location filter
    if (searchParams.location) {
      const searchLocation = searchParams.location.toLowerCase();
      if (!property.location.toLowerCase().includes(searchLocation)) {
        return false;
      }
    }

    // Search: Property Type filter
    if (searchParams.propertyType) {
      // You'd need to add a propertyType field to your property data
      // For now, we'll skip this or you can add it
    }

    // Search: Price Range filter
    if (searchParams.priceRange) {
      if (searchParams.priceRange === '500000+') {
        if (property.price < 500000) return false;
      } else {
        const [min, max] = searchParams.priceRange.split('-').map(Number);
        if (property.price < min || property.price > max) return false;
      }
    }

    // Advanced Filter: Price filter
    if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
      return false;
    }

    // Advanced Filter: Bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== 'Any') {
      if (filters.bedrooms === '5+' && property.beds < 5) return false;
      if (filters.bedrooms !== '5+' && property.beds !== parseInt(filters.bedrooms)) return false;
    }

    // Advanced Filter: Bathrooms filter
    if (filters.bathrooms && filters.bathrooms !== 'Any') {
      if (filters.bathrooms === '5+' && property.baths < 5) return false;
      if (filters.bathrooms !== '5+' && property.baths !== parseInt(filters.bathrooms)) return false;
    }

    // Advanced Filter: Amenities filter
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity =>
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
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
        <FilterModal
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
                  Search Properties
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {filteredProperties.length} properties found
                </p>
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Home className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {isFilterOpen ? 'Hide Filter' : 'Filter'}
                </span>
              </button>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* No Results */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No properties match your criteria.
                </p>
                <button
                  onClick={() => setFilters({ priceRange: [0, 1000000], bedrooms: '', bathrooms: '', amenities: [] })}
                  className="mt-4 text-teal-600 dark:text-teal-400 border p-3 rounded-lg font-medium hover:text-teal-700 dark:hover:text-teal-300"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* View More Button */}
            {filteredProperties.length > 0 && (
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

export default PropertyList;