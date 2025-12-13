import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bed, Bath, MapPin, Heart } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click when clicking heart
    setIsFavorite(!isFavorite);
    console.log(`Property ${property.id} favorite status:`, !isFavorite);
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleViewClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking View button
    navigate(`/property/${property.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-neutral-950 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.featured && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </span>
          )}
          <span className="bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {property.tag}
          </span>
        </div>
        {/* Favorite Icon */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-3 right-3 bg-white dark:bg-gray-700 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isFavorite 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600 dark:text-gray-300'
            }`}
          />
        </button>
        {/* Image dots indicator */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3 text-gray-500 dark:text-gray-400">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
            ₦{property.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">/{property.period}</span>
        </div>

        {/* Beds and Baths */}
        <div className="flex items-center gap-4 mb-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span className="text-sm">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{property.baths}</span>
          </div>
        </div>

        {/* Agent and View Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              {property.agent}
            </span>
          </div>
          <button 
            onClick={handleViewClick}
            className="text-teal-600 dark:text-teal-400 font-medium text-sm hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;