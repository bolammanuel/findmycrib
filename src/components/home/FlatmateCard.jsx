import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Heart, User, Briefcase } from 'lucide-react';

const FlatmateCard = ({ flatmate }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    console.log(`Flatmate ${flatmate.id} favorite status:`, !isFavorite);
  };

  const handleViewProfile = () => {
    navigate(`/flatmate/${flatmate.id}`);
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    navigate(`/flatmate/${flatmate.id}`);
  };

  return (
    <div 
      onClick={handleViewProfile}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={flatmate.image}
          alt={flatmate.name}
          className="w-full h-full object-cover"
        />
        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          {flatmate.verified && (
            <span className="bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Verified
            </span>
          )}
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {flatmate.lookingFor}
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
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Name and Age */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {flatmate.name}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {flatmate.age}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3 text-gray-500 dark:text-gray-400">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{flatmate.location}</span>
        </div>

        {/* Budget */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
            ₦{flatmate.budget.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
        </div>

        {/* Details */}
        <div className="flex items-center gap-4 mb-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span className="text-sm capitalize">{flatmate.gender}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm capitalize">{flatmate.occupation}</span>
          </div>
        </div>

        {/* Preferences */}
        <div className="flex flex-wrap gap-2 mb-4">
          {flatmate.preferences.slice(0, 2).map((pref, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
            >
              {pref}
            </span>
          ))}
        </div>

        {/* View Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Available: {flatmate.availableFrom}
          </span>
          <button 
            onClick={handleViewClick}
            className="text-teal-600 dark:text-teal-400 font-medium text-sm hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlatmateCard;