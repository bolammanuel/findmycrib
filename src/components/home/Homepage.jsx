import React, { useState } from 'react';
import Header from '../layout/Header';
import TabSection from './TabSection';
import SearchFilters from './SearchFilters';
import PropertyList from './PropertyList';
import FlatmatesList from './FlatmatesList';
import StatsSection from './StatsSection';
import FeaturedAgents from './FeaturedAgents';
import Footer from '../layout/Footer';

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('shortlet');
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    gender: '',
    budget: ''
  });

  const handleSearch = (params) => {
    setSearchParams(params);
    console.log('Searching with params:', params);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <TabSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <SearchFilters onSearch={handleSearch} activeTab={activeTab} />
      
      {/* Conditionally render based on active tab */}
      {activeTab === 'shortlet' ? (
        <PropertyList searchParams={searchParams} />
      ) : (
        <FlatmatesList searchParams={searchParams} />
      )}
      
      <StatsSection />
      <FeaturedAgents />
      <Footer />
    </div>
  );
};

export default Homepage;