import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/authContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header className="bg-tertiary text-white shadow-md">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold italic">
          <Link to="/" className="hover:text-primary transition-colors">
            Winget Script
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-base">
          <Link to="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          {isAuthenticated && (
            <Link to="/myapps" className="hover:text-primary transition-colors">
              My Apps
            </Link>
          )}

          {/* Auth Buttons (Desktop) */}
          <div className="flex gap-3 ml-6">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1.5 rounded-xl text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-tertiary px-4 py-1.5 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-4 py-1.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div className="md:hidden w-[95%] mx-auto h-1 border border-teal-500 rounded-2xl shadow-2xl bg-amber-500"></div>
          <div className="md:hidden grid grid-cols-2 gap-4 px-2 py-4">
            <Link
              to="/about"
              className="block py-2 hover:text-primary transition-colors text-center border border-gray-200 rounded-2xl"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/myapps"
              className="block py-2 hover:text-primary transition-colors text-center border border-gray-200 rounded-2xl"
              onClick={() => setIsOpen(false)}
            >
              My Apps
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="block py-2 text-center text-red-600 font-medium border border-gray-200 rounded-2xl"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 hover:text-primary transition-colors text-center border border-gray-200 rounded-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 hover:text-primary transition-colors text-center border border-gray-200 rounded-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </header>
  );
}
