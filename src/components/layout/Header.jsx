import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, User, Menu, X, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSignOut = () => {
    signOut();
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <header
      className="bg-white 
  dark:bg-neutral-950
  shadow-sm 
  border-b 
  border-gray-200 
  dark:border-neutral-800 
  transition-colors
  dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FC</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                FindMyCrib
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Dark mode toggle */}
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

            {/* Conditional rendering based on authentication */}
            {isAuthenticated ? (
              <>
                {/* List Property button */}
                <Link
                  to="/become-host"
                  className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-sm"
                >
                  List Property
                </Link>

                {/* Profile Avatar with Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={user?.profileImage || "https://ui-avatars.com/api/?name=User&size=40&background=4F46E5&color=fff"}
                      alt={user?.fullName || "Profile"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                    />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {user?.fullName || "User"}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Sign In button - Only shown when NOT authenticated */}
                <Link
                  to="/signin"
                  className="flex items-center gap-2 px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Sign In</span>
                </Link>

                {/* List Property button */}
                <Link
                  to="/become-host"
                  className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-sm"
                >
                  List Property
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-4">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>

              {/* Conditional mobile menu based on authentication */}
              {isAuthenticated ? (
                <>
                  {/* Profile Link */}
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <img
                      src={user?.profileImage || "https://ui-avatars.com/api/?name=User&size=40&background=4F46E5&color=fff"}
                      alt={user?.fullName || "Profile"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">{user?.fullName || "My Profile"}</span>
                  </Link>

                  {/* List Property button */}
                  <Link
                    to="/become-host"
                    className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    List Property
                  </Link>

                  {/* Sign Out button */}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Sign In button */}
                  <Link
                    to="/signin"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Sign In</span>
                  </Link>

                  {/* List Property button */}
                  <Link
                    to="/become-host"
                    className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    List Property
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;