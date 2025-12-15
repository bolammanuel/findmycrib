import React, { createContext, useContext, useState } from 'react';

const ListingsContext = createContext();

export const useListings = () => {
    const context = useContext(ListingsContext);
    if (!context) {
        throw new Error('useListings must be used within ListingsProvider');
    }
    return context;
};

export const ListingsProvider = ({ children }) => {
    const [properties, setProperties] = useState([
        // Initial sample properties with full details
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
            ],
            title: 'Modern Luxury Apartment',
            location: 'Lekki, Lagos',
            price: 205000,
            period: 'month',
            beds: 3,
            baths: 2,
            agent: 'Rebecca Bruce',
            featured: true,
            tag: 'For Sale',
            amenities: ['Wifi', 'Parking', 'Security'],
            description: 'Beautiful modern apartment with stunning views and premium amenities. Perfect for professionals and families.',
            listingType: 'shortlet',
            moveInDate: '2025-01-15',
            lifestylePreference: 'professional',
            availableFrom: 'Immediately'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
            ],
            title: 'Modern Luxury Apartment',
            location: 'Victoria Island, Lagos',
            price: 45000,
            period: 'month',
            beds: 2,
            baths: 2,
            agent: 'Rebecca Bruce',
            featured: false,
            tag: 'For Rent',
            amenities: ['Wifi', 'Generator'],
            description: 'Cozy apartment in the heart of Victoria Island with easy access to all amenities.',
            listingType: 'shortlet',
            moveInDate: '2025-02-01',
            lifestylePreference: 'quiet',
            availableFrom: 'Feb 2025'
        }
    ]);

    const addProperty = (newProperty) => {
        const property = {
            id: Date.now(), // Use timestamp as unique ID
            image: newProperty.photos[0]?.preview || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
            images: newProperty.photos.map(photo => photo.preview),
            title: newProperty.title,
            location: newProperty.location,
            price: newProperty.price,
            period: newProperty.period,
            beds: newProperty.beds,
            baths: newProperty.baths,
            agent: 'Current User', // Replace with actual logged-in user
            featured: false,
            tag: newProperty.listingType === 'shortlet' ? 'For Rent' : newProperty.listingType === 'flatmate' ? 'Looking for Flatmate' : 'For Sale',
            amenities: newProperty.amenities,
            description: newProperty.description,
            listingType: newProperty.listingType,
            moveInDate: newProperty.moveInDate,
            lifestylePreference: newProperty.lifestylePreference,
            availableFrom: newProperty.moveInDate || 'Immediately',
            photos: newProperty.photos // Keep original photo objects too
        };

        setProperties(prev => [property, ...prev]);
    };

    const getPropertyById = (id) => {
        return properties.find(property => property.id === parseInt(id));
    };

    return (
        <ListingsContext.Provider value={{ properties, addProperty, getPropertyById }}>
            {children}
        </ListingsContext.Provider>
    );
};