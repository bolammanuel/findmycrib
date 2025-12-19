import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error loading user:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const signUp = (userData) => {
        const newUser = {
            fullName: userData.fullName,
            email: userData.email,
            phone: '',
            location: '',
            bio: '',
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            accountType: 'Client Account',
            budgetRange: '',
            bedrooms: '',
            lifestyle: '',
            profileImage: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.fullName) + '&size=200&background=4F46E5&color=fff'
        };

        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        return newUser;
    };

    const signIn = (email) => {
        // Simulate login - in real app, fetch user data from backend
        const mockUser = {
            fullName: 'John Doe',
            email: email,
            phone: '+234 801 234 5678',
            location: 'Lagos, Nigeria',
            bio: 'Looking for a comfortable apartment in Lekki area. Professional working remotely.',
            joinedDate: 'December 2024',
            accountType: 'Client Account',
            budgetRange: '₦200,000 - ₦300,000',
            bedrooms: '2',
            lifestyle: 'Professional',
            profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
        };

        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
    };

    const signOut = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signUp, signIn, signOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};