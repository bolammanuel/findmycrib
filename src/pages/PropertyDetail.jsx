import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, Bed, Bath, MapPin, Calendar, Phone, MessageCircle, Star } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PropertyDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Mock property data - In real app, fetch based on id
  const property = {
    id: 1,
    title: 'Modern Luxury Apartment in Yaba',
    location: 'Shomolu, Yaba',
    price: 65000,
    period: 'Night',
    beds: 2,
    baths: 3,
    type: 'Shortlet',
    verified: true,
    availableFrom: 'Immediately',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
    ],
    description: 'Lorem ipsum dolor sit amet consectetur. Faucibus vitae nunc rhoncus et quam. Posuere accumsan enim purus eget amet ultrices accumsan. Duis donec ut sed lacus magna pellentesque proin. Duis est morbi eget faucibus.Duis est morbi eget faucibus.',
    amenities: [
      { name: 'Parking', icon: '🚗' },
      { name: 'Furnished', icon: '🛋️' },
      { name: 'Gym', icon: '💪' },
      { name: 'High-Speed WiFi', icon: '📶' },
      { name: 'Air Conditioning', icon: '❄️' },
      { name: 'Pool', icon: '🏊' }
    ],
    agent: {
      name: 'David Pedro',
      rating: 4.9,
      responseRate: '98%',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      phone: '+234 80 *** *** ***'
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share property');
  };

  const handleChatWithOwner = () => {
    // Implement chat functionality
    console.log('Chat with owner');
  };

  const handleCall = () => {
    // Implement call functionality
    console.log('Call owner');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to listings</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {/* Image Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeImage === index
                        ? 'bg-white w-6'
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === index
                      ? 'border-teal-600 dark:border-teal-500'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Property Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold px-3 py-1 rounded-full">
                      {property.type}
                    </span>
                    {property.verified && (
                      <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-sm font-semibold px-3 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-5 h-5" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={toggleFavorite}
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Beds and Baths */}
              <div className="flex items-center gap-8 py-4 border-y border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Bed className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{property.beds}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Bath className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{property.baths}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Description
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="text-2xl">{amenity.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Availability
                </h2>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Calendar className="w-5 h-5" />
                  <span>Available: <span className="font-semibold">{property.availableFrom}</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price and Agent Card */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sticky top-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                    ₦{property.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /{property.period}
                  </span>
                </div>

                {/* Chat with Owner Button */}
                <button
                  onClick={handleChatWithOwner}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 mb-3 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat with Owner
                </button>

                {/* Call Button */}
                <button
                  onClick={handleCall}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {property.agent.phone}
                </button>
              </div>

              {/* Agent Info */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Hosted by
                </h3>
                <div className="flex items-start gap-3">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {property.agent.name}
                      </h4>
                      {property.agent.verified && (
                        <span className="text-xs bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded">
                          Verified Host
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {property.agent.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Response rate: {property.agent.responseRate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;