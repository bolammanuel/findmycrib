import React from 'react';
import { Star, Phone, Mail } from 'lucide-react';

const FeaturedAgents = () => {
  const agents = [
    {
      id: 1,
      name: 'David Pedro',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      rating: 4.8,
      reviews: 124,
      listings: 45,
      verified: true,
      phone: '+234 80 *** *** ***',
      email: 'david@email.com'
    },
    {
      id: 2,
      name: 'Faith Altschool',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      rating: 4.9,
      reviews: 134,
      listings: 65,
      verified: true,
      phone: '+234 80 *** *** ***',
      email: 'faith@yahoo.com'
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-neutral-900 py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Featured Agent
        </h2>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white dark:bg-neutral-950 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Agent Image and Info */}
              <div className="flex flex-col items-center text-center mb-6">
                {/* Profile Image */}
                <div className="relative mb-4">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>

                {/* Name and Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {agent.name}
                  </h3>
                  {agent.verified && (
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold px-2 py-1 rounded">
                      Verified
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {agent.rating}
                    </span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    ({agent.reviews})
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {agent.listings} listings
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">{agent.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{agent.email}</span>
                </div>
              </div>

              {/* View Profile Button */}
              <button className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedAgents;