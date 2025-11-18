import React from 'react';
import { Home, Users, Award, Calendar } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: Home,
      value: '10,000+',
      label: 'Across Listing',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-gray-900 dark:text-gray-100'
    },
    {
      id: 2,
      icon: Users,
      value: '50,000+',
      label: 'Happy Clients',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-gray-900 dark:text-gray-100'
    },
    {
      id: 3,
      icon: Calendar,
      value: '2,500+',
      label: 'Verified Agents',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-gray-900 dark:text-gray-100'
    },
    {
      id: 4,
      icon: Award,
      value: '15+',
      label: 'Years Experience',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-gray-900 dark:text-gray-100'
    }
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose FindMyCrib
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center g-black/5 dark:bg-neutral-950 p-6 rounded-xl"
              >
                {/* Icon */}
                <div className={`${stat.bgColor} p-5 rounded-2xl mb-6 transition-colors `}>
                  <Icon className={`w-8 h-8 ${stat.iconColor}`} strokeWidth={1.5} />
                </div>

                {/* Value */}
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </h3>

                {/* Label */}
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;