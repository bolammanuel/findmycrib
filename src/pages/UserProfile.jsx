import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, MapPin, Calendar, Settings, Heart, MessageCircle, Bell, User as UserIcon, Edit2, Bed, Bath, Camera, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { darkMode, toggleDarkMode } = useTheme();
    const { user, updateUser, isAuthenticated } = useAuth();

    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(location.state?.isNewUser || false);
    const [showWelcome, setShowWelcome] = useState(location.state?.isNewUser || false);

    // Initialize with user data from auth context or empty defaults
    const [userData, setUserData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
        bio: user?.bio || '',
        joinedDate: user?.joinedDate || '',
        accountType: user?.accountType || 'Client Account',
        budgetRange: user?.budgetRange || '',
        bedrooms: user?.bedrooms || '',
        lifestyle: user?.lifestyle || '',
        profileImage: user?.profileImage || 'https://ui-avatars.com/api/?name=User&size=200&background=4F46E5&color=fff'
    });

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        }
    }, [isAuthenticated, navigate]);

    // Update local state when user context changes
    useEffect(() => {
        if (user) {
            setUserData({
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
                location: user.location || '',
                bio: user.bio || '',
                joinedDate: user.joinedDate || '',
                accountType: user.accountType || 'Client Account',
                budgetRange: user.budgetRange || '',
                bedrooms: user.bedrooms || '',
                lifestyle: user.lifestyle || '',
                profileImage: user.profileImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.fullName) + '&size=200&background=4F46E5&color=fff'
            });
        }
    }, [user]);

    // Alerts state
    const [alerts, setAlerts] = useState({
        emailNotifications: true,
        priceDropAlerts: true,
        newMatches: true
    });

    // Sample saved properties
    const savedProperties = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
            title: 'Modern Luxury Apartment in Yaba',
            location: 'Phase 1, Lekki',
            price: 120000,
            period: 'Night',
            beds: 3,
            baths: 4,
            tag: 'Loft',
            agent: 'Divine Dhee'
        }
    ];

    // Sample messages
    const messages = [
        {
            id: 1,
            property: 'Modern 2BR Apartment in Lekki',
            sender: 'Sarah Johnson',
            message: 'The property is available for viewing this weekend.',
            timestamp: '10/15/2025, 6:53:45 AM',
            isNew: true,
            avatar: 'S'
        },
        {
            id: 2,
            property: 'Luxury Studio with Pool Access',
            sender: 'Michael Chen',
            message: 'Thank you for your interest. When would you like to schedule a tour?',
            timestamp: '10/15/2025, 6:54:14 AM',
            isNew: false,
            avatar: 'S'
        }
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImage = reader.result;
                setUserData(prev => ({ ...prev, profileImage: newImage }));
                updateUser({ profileImage: newImage });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (field, value) => {
        setUserData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = () => {
        setIsEditing(false);
        updateUser(userData);
        console.log('Saving profile:', userData);
        alert('Profile updated successfully!');
    };

    const toggleAlert = (alertType) => {
        setAlerts(prev => ({ ...prev, [alertType]: !prev[alertType] }));
    };

    if (!isAuthenticated || !user) {
        return null; // or a loading spinner
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Welcome Banner for New Users */}
            {showWelcome && (
                <div className="bg-teal-600 text-white py-4">
                    <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🎉</span>
                            <div>
                                <h3 className="font-bold">Welcome to FindMyCrib!</h3>
                                <p className="text-sm">Please complete your profile setup to get started.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowWelcome(false)}
                            className="text-white hover:text-gray-200"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Navigation Header */}
            <header className="bg-white dark:bg-neutral-950 shadow-sm border-b border-gray-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">FC</span>
                            </div>
                        </Link>

                        <nav className="hidden md:flex items-center gap-8">
                            <Link to="/?tab=shortlet" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                                Shortlets
                            </Link>
                            <Link to="/?tab=flatmates" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                                Flatmates
                            </Link>
                            <Link to="/how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                                How it Works
                            </Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? (
                                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                            <div className="flex items-center gap-3">
                                <img
                                    src={userData.profileImage}
                                    alt={userData.fullName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {userData.fullName}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar - Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                            {/* Profile Image */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative group">
                                    <img
                                        src={userData.profileImage}
                                        alt={userData.fullName}
                                        className="w-32 h-32 rounded-full object-cover mb-4"
                                    />
                                    <label
                                        htmlFor="profile-upload"
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <Camera className="w-8 h-8 text-white" />
                                    </label>
                                    <input
                                        type="file"
                                        id="profile-upload"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                    {userData.fullName}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                    {userData.email}
                                </p>
                                <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded text-sm font-medium">
                                    {userData.accountType}
                                </span>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4 mb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <Phone className="w-5 h-5" />
                                    <span className="text-sm">{userData.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-sm">{userData.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <Calendar className="w-5 h-5" />
                                    <span className="text-sm">Joined {userData.joinedDate}</span>
                                </div>
                            </div>

                            {/* Account Settings Button */}
                            <button
                                onClick={() => navigate('/account-settings')}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    Account Settings
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Tabs */}
                    <div className="lg:col-span-3">
                        {/* Tabs Navigation */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-6">
                            <div className="flex border-b border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === 'overview'
                                        ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <UserIcon className="w-5 h-5" />
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('saved')}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === 'saved'
                                        ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <Heart className="w-5 h-5" />
                                    Saved
                                </button>
                                <button
                                    onClick={() => setActiveTab('messages')}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === 'messages'
                                        ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Messages
                                </button>
                                <button
                                    onClick={() => setActiveTab('alerts')}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === 'alerts'
                                        ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <Bell className="w-5 h-5" />
                                    Alerts
                                </button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    {/* Personal Information */}
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    Personal Information
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    Manage your personal details
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                                                className="flex items-center gap-2 px-4 py-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                {isEditing ? 'Save' : 'Edit'}
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={userData.fullName}
                                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={userData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={userData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    value={userData.location}
                                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="col-span-2">
                                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                                    Bio
                                                </label>
                                                <textarea
                                                    value={userData.bio}
                                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                                    disabled={!isEditing}
                                                    rows={3}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Search Preferences */}
                                    <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            Search Preferences
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                            Set your property preferences for better recommendations
                                        </p>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                                    Budget Range (₦)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={userData.budgetRange}
                                                    onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                                    Bedrooms
                                                </label>
                                                <select
                                                    value={userData.bedrooms}
                                                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5+">5+</option>
                                                </select>
                                            </div>

                                            <div className="col-span-2">
                                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                                    Lifestyle
                                                </label>
                                                <select
                                                    value={userData.lifestyle}
                                                    onChange={(e) => handleInputChange('lifestyle', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                                                >
                                                    <option value="Professional">Professional</option>
                                                    <option value="Student">Student</option>
                                                    <option value="Quiet">Quiet</option>
                                                    <option value="Social">Social</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Saved Tab */}
                            {activeTab === 'saved' && (
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        Saved Properties
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                        {savedProperties.length} property saved
                                    </p>

                                    <div className="space-y-4">
                                        {savedProperties.map((property) => (
                                            <div
                                                key={property.id}
                                                className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                                                onClick={() => navigate(`/property/${property.id}`)}
                                            >
                                                <div className="relative w-48 h-32 flex-shrink-0">
                                                    <img
                                                        src={property.image}
                                                        alt={property.title}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                    <span className="absolute top-2 left-2 bg-gray-700 text-white text-xs font-semibold px-2 py-1 rounded">
                                                        {property.tag}
                                                    </span>
                                                    {/* Image dots */}
                                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                                                    </div>
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                                        {property.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
                                                        <MapPin className="w-4 h-4" />
                                                        <span className="text-sm">{property.location}</span>
                                                    </div>
                                                    <div className="flex items-baseline gap-2 mb-3">
                                                        <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                                                            #{property.price.toLocaleString()}
                                                        </span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            /{property.period}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                                        <div className="flex items-center gap-1">
                                                            <Bed className="w-4 h-4" />
                                                            <span className="text-sm">{property.beds}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Bath className="w-4 h-4" />
                                                            <span className="text-sm">{property.baths}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-between items-end">
                                                    <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                                                            alt={property.agent}
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {property.agent}
                                                            </p>
                                                            <button className="text-xs text-teal-600 dark:text-teal-400 hover:underline">
                                                                View
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Messages Tab */}
                            {activeTab === 'messages' && (
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        Messages
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                        Conversations with property owners
                                    </p>

                                    <div className="space-y-4">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                                            >
                                                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                                                        {msg.avatar}
                                                    </span>
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-1">
                                                        <h4 className="font-bold text-gray-900 dark:text-white">
                                                            {msg.property}
                                                        </h4>
                                                        {msg.isNew && (
                                                            <span className="bg-teal-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        {msg.sender}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                        {msg.message}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                                        {msg.timestamp}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Alerts Tab */}
                            {activeTab === 'alerts' && (
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        Property Alerts
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                        Get notified when properties matching your preferences are listed
                                    </p>

                                    <div className="space-y-6">
                                        {/* Email Notifications */}
                                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                    Email Notifications
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Receive updates via email
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => toggleAlert('emailNotifications')}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${alerts.emailNotifications
                                                    ? 'bg-teal-600 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                    }`}
                                            >
                                                {alerts.emailNotifications ? 'Enabled' : 'Disabled'}
                                            </button>
                                        </div>

                                        {/* Price Drop Alerts */}
                                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                    Price Drop Alerts
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Get notified when saved properties reduce price
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => toggleAlert('priceDropAlerts')}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${alerts.priceDropAlerts
                                                    ? 'bg-teal-600 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                    }`}
                                            >
                                                {alerts.priceDropAlerts ? 'Enabled' : 'Disabled'}
                                            </button>
                                        </div>

                                        {/* New Matches */}
                                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                    New Matches
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Properties matching your preferences
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => toggleAlert('newMatches')}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${alerts.newMatches
                                                    ? 'bg-teal-600 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                    }`}
                                            >
                                                {alerts.newMatches ? 'Enabled' : 'Disabled'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserProfile;