import React from 'react';
import { Home, Users } from 'lucide-react';

const TabSection = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white dark:bg-neutral-950
 py-4 sm:py-6 md:py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-8">
          {/* ShortLet Tab */}
          <button
            onClick={() => setActiveTab('shortlet')}
            className={`flex items-center gap-1.5 sm:gap-2 md:gap-3 px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg transition-all ${
              activeTab === 'shortlet'
                ? 'bg-blue-50 dark:bg-blue-900/30 border-b-4 border-white rounded-none'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:border-b-2 dark:hover:rounded-none'
            }`}
          >
            <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg ${
              activeTab === 'shortlet' ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-gray-100 dark:bg-gray-700'
            }`}>
              <Home className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                activeTab === 'shortlet' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300'
              }`} />
            </div>
            <span className={`text-sm sm:text-base md:text-lg font-semibold ${
              activeTab === 'shortlet' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
            }`}>
              ShortLet
            </span>
          </button>

          {/* Flatmates Tab */}
          <button
            onClick={() => setActiveTab('flatmates')}
            className={`flex items-center gap-1.5 sm:gap-2 md:gap-3 px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg transition-all ${
              activeTab === 'flatmates'
                ? 'bg-blue-50 dark:bg-blue-900/30 border-b-4 border-white rounded-none'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:border-b-2 dark:hover:rounded-none'
            }`}
          >
            <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg ${
              activeTab === 'flatmates' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'
            }`}>
              <Users className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                activeTab === 'flatmates' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'
              }`} />
            </div>
            <span className={`text-sm sm:text-base md:text-lg font-semibold ${
              activeTab === 'flatmates' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
            }`}>
              Flatmates
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabSection;