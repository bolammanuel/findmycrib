import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Moon, Sun, User, ChevronRight, ChevronLeft, Upload, Calendar, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useListings } from '../context/ListingsContext';

const CreateListing = () => {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useTheme();
    const { addProperty } = useListings(); // Add this line
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    // Form data state
    const [formData, setFormData] = useState({
        // Step 1: Basic Information
        listingType: '',
        propertyTitle: '',
        location: '',
        monthlyPrice: '',

        // Step 2: Property Details
        bedrooms: '',
        bathrooms: '',
        amenities: [],
        description: '',

        // Step 3: Additional Information
        photos: [],
        moveInDate: '',
        lifestylePreference: ''
    });

    const amenitiesList = ['Wifi', 'Parking', 'Gym', 'Pool', 'Security', 'Generator'];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleAmenity = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                if (!formData.listingType) {
                    alert('Please select a listing type');
                    return false;
                }
                if (!formData.propertyTitle.trim()) {
                    alert('Please enter a property title');
                    return false;
                }
                if (!formData.location.trim()) {
                    alert('Please enter a location');
                    return false;
                }
                if (!formData.monthlyPrice || formData.monthlyPrice <= 0) {
                    alert('Please enter a valid monthly price');
                    return false;
                }
                return true;

            case 2:
                if (!formData.bedrooms) {
                    alert('Please select number of bedrooms');
                    return false;
                }
                if (!formData.bathrooms) {
                    alert('Please select number of bathrooms');
                    return false;
                }
                if (!formData.description.trim()) {
                    alert('Please enter a description');
                    return false;
                }
                return true;

            case 3:
                if (formData.photos.length === 0) {
                    alert('Please upload at least one photo');
                    return false;
                }
                if (!formData.moveInDate) {
                    alert('Please select a preferred move-in date');
                    return false;
                }
                return true;

            default:
                return true;
        }
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handlePublish = () => {
        // Validate all steps one more time
        if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
            return;
        }
        console.log('Publishing listing:', formData);
        // Handle form submission
        addProperty({
            title: formData.propertyTitle,
            location: formData.location,
            price: parseInt(formData.monthlyPrice),
            period: 'month',
            beds: parseInt(formData.bedrooms) || 0,
            baths: parseInt(formData.bathrooms) || 0,
            amenities: formData.amenities,
            description: formData.description,
            listingType: formData.listingType,
            photos: formData.photos,
            moveInDate: formData.moveInDate,
            lifestylePreference: formData.lifestylePreference
        });
        alert('Listing published successfully!');
        navigate('/');
    };

    const calculateProgress = () => {
        return (currentStep / totalSteps) * 100;
    };

    const handlePhotoUpload = (files) => {
        const fileArray = Array.from(files);
        const validFiles = fileArray.filter(file => {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert(`${file.name} is too large. Max size is 5MB.`);
                return false;
            }
            return true;
        });

        const photoObjects = validFiles.map(file => ({
            file: file,
            preview: URL.createObjectURL(file),
            name: file.name
        }));

        setFormData(prev => ({
            ...prev,
            photos: [...prev.photos, ...photoObjects]
        }));
    };

    const removePhoto = (index) => {
        setFormData(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mini Header */}
            <header className="bg-white dark:bg-neutral-950 shadow-sm border-b border-gray-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">FC</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                                FindMyCrib
                            </span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {darkMode ? (
                                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                            <Link
                                to="/signin"
                                className="flex items-center gap-2 px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                <User className="w-5 h-5" />
                                <span className="font-medium">Sign In</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Create your Listing
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Share your property with potential tenants or flatmates
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Step {currentStep} of {totalSteps}
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {Math.round(calculateProgress())}% Complete
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-teal-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${calculateProgress()}%` }}
                        />
                    </div>
                </div>

                {/* Form Steps */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Basic Information
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Tell us about your listing type and location
                                </p>
                            </div>

                            {/* Listing Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Listing Type
                                </label>
                                <select
                                    value={formData.listingType}
                                    onChange={(e) => handleInputChange('listingType', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="">Select Listing Type</option>
                                    <option value="shortlet">ShortLet</option>
                                    <option value="flatmate">Looking for Flatmate</option>
                                    <option value="room">Room Available</option>
                                </select>
                            </div>

                            {/* Property Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Property Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.propertyTitle}
                                    onChange={(e) => handleInputChange('propertyTitle', e.target.value)}
                                    placeholder="e.g., Modern 2BR Apartment in Lekki"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    placeholder="e.g., Lekki Phase 1, Lagos"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                />
                            </div>

                            {/* Monthly Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Monthly Price (₦)
                                </label>
                                <input
                                    type="number"
                                    value={formData.monthlyPrice}
                                    onChange={(e) => handleInputChange('monthlyPrice', e.target.value)}
                                    placeholder="250,000"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Property Details */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Property Details
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Provide details about the property
                                </p>
                            </div>

                            {/* Bedrooms and Bathrooms */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Bedrooms
                                    </label>
                                    <select
                                        value={formData.bedrooms}
                                        onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="">Any</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5+">5+</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Bathrooms
                                    </label>
                                    <select
                                        value={formData.bathrooms}
                                        onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="">Any</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5+">5+</option>
                                    </select>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                    Amenities
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {amenitiesList.map((amenity) => (
                                        <button
                                            key={amenity}
                                            type="button"
                                            onClick={() => toggleAmenity(amenity)}
                                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${formData.amenities.includes(amenity)
                                                ? 'bg-teal-600 text-white border-teal-600'
                                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-teal-600'
                                                }`}
                                        >
                                            {amenity}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Describe your property in details....."
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Additional Information */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Additional Information
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Add final touches to your listing
                                </p>
                            </div>

                            {/* Property Photos */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                    Property Photos
                                </label>
                                <input
                                    type="file"
                                    id="photo-upload"
                                    multiple
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    onChange={(e) => handlePhotoUpload(e.target.files)}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="block border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-teal-500 transition-colors cursor-pointer"
                                >
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        PNG, JPG or WEBP (max. 5MB each)
                                    </p>
                                </label>

                                {/* Display uploaded photos */}
                                {formData.photos.length > 0 && (
                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        {formData.photos.map((photo, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={photo.preview}
                                                    alt={`Upload ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removePhoto(index)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Preferred Move-in Date */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Preferred Move-in Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.moveInDate}
                                    onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            {/* Lifestyle Preference */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Lifestyle Preference
                                </label>
                                <select
                                    value={formData.lifestylePreference}
                                    onChange={(e) => handleInputChange('lifestylePreference', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="">Select Preference</option>
                                    <option value="quiet">Quiet</option>
                                    <option value="social">Social</option>
                                    <option value="professional">Professional</option>
                                    <option value="student">Student-friendly</option>
                                </select>
                            </div>

                            {/* Listing Summary */}
                            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    Listing Summary
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formData.listingType || 'Not set'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Title:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formData.propertyTitle || 'Not set'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Location:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formData.location || 'Not set'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Price:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            ₦{formData.monthlyPrice ? parseInt(formData.monthlyPrice).toLocaleString() : '0'} /month
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Bedrooms:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formData.bedrooms || 'Not set'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Bathrooms:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formData.bathrooms || 'Not set'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div>
                            {currentStep > 1 && (
                                <button
                                    onClick={handlePrevious}
                                    className="flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </button>
                            )}
                            {currentStep === 1 && (
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                        <div>
                            {currentStep < totalSteps ? (
                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            ) : (
                                <button
                                    onClick={handlePublish}
                                    className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                                >
                                    Publish Listing
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateListing;