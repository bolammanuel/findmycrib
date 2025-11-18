import React, { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

const FlatmatesFilterModal = ({ isOpen, onClose, onApplyFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [gender, setGender] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [occupation, setOccupation] = useState('');
  const [preferences, setPreferences] = useState([]);

  const preferencesList = ['Non-smoker', 'Pet-friendly', 'Quiet', 'Social', 'Clean', 'Night Owl'];

  const handlePreferenceToggle = (preference) => {
    setPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleApply = () => {
    onApplyFilter({
      priceRange,
      gender,
      ageRange,
      occupation,
      preferences
    });
    onClose();
  };

  const handleClearAll = () => {
    setPriceRange([0, 500000]);
    setGender('');
    setAgeRange('');
    setOccupation('');
    setPreferences([]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Filter Sidebar */}
      <div 
        className={`
          fixed md:relative
          left-0 top-0
          h-full
          bg-white dark:bg-neutral-900 
          border-gray-200 dark:border-gray-700 
          transition-all duration-300 
          overflow-y-auto
          z-50 md:z-auto
          ${isOpen ? 'w-full sm:w-80 md:w-80' : 'w-0'}
        `}
      >
        <div className={`p-4 sm:p-6 ${isOpen ? 'block' : 'hidden'}`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleClearAll}
                className="text-teal-600 dark:text-teal-400 text-xs sm:text-sm font-medium hover:text-teal-700 dark:hover:text-teal-300"
              >
                Clear all
              </button>
              {/* Close button for mobile */}
              <button
                onClick={onClose}
                className="md:hidden p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Budget Range */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Budget Range (₦)
            </label>
            <input
              type="range"
              min="0"
              max="500000"
              step="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span>₦{priceRange[0].toLocaleString()}</span>
              <span>₦{priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Gender Preference
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          {/* Age Range */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Age Range
            </label>
            <select
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="">Any</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-45">36-45</option>
              <option value="46+">46+</option>
            </select>
          </div>

          {/* Occupation */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Occupation
            </label>
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="">Any</option>
              <option value="student">Student</option>
              <option value="professional">Professional</option>
              <option value="entrepreneur">Entrepreneur</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Lifestyle Preferences */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Lifestyle Preferences
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {preferencesList.map((preference) => (
                <button
                  key={preference}
                  onClick={() => handlePreferenceToggle(preference)}
                  className={`px-3 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors ${
                    preferences.includes(preference)
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-teal-600 dark:hover:border-teal-500'
                  }`}
                >
                  {preference}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm sm:text-base"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default FlatmatesFilterModal;