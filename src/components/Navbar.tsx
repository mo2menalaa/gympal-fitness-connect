
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu,
  X,
  User,
  ChevronDown,
  UserPlus
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gympal-blue">
              <span className="text-gympal-green">GYM</span>PAL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gympal-blue font-medium transition">
              Home
            </Link>
            <Link to="/coaches" className="text-gray-700 hover:text-gympal-blue font-medium transition">
              Find Coaches
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gympal-blue font-medium transition">
              About Us
            </Link>

            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-gympal-blue font-medium transition">
                  <User size={20} />
                  <span>Account</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gympal-blue hover:text-white">Dashboard</Link>
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gympal-blue hover:text-white">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gympal-blue hover:text-white">Settings</Link>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gympal-blue hover:text-white">Log Out</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <Button variant="outline" className="border-gympal-blue text-gympal-blue hover:bg-gympal-blue hover:text-white">
                    <User size={18} className="mr-1" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?signup=true">
                  <Button variant="default" className="bg-gympal-blue hover:bg-gympal-blue/90">
                    <UserPlus size={18} className="mr-1" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-700"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-gympal-blue font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/coaches" 
                className="text-gray-700 hover:text-gympal-blue font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Coaches
              </Link>
              <Link 
                to="/about"
                className="text-gray-700 hover:text-gympal-blue font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-gympal-blue font-medium transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button className="text-left text-gray-700 hover:text-red-600 font-medium transition">
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gympal-blue font-medium transition"
                  >
                    <User size={18} />
                    <span>Sign In</span>
                  </Link>
                  <Link 
                    to="/auth?signup=true"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gympal-blue font-medium transition"
                  >
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
