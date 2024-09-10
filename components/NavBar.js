import React, { useState } from 'react';
import { useAuth } from '../lib/auth';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { isAuthenticated, username, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <header className="bg-kali-secondary dark:bg-synthwave-secondary text-kali-text dark:text-synthwave-text p-4 pt-safe">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vaulty</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black px-3 py-1 rounded text-sm focus:outline-none"
              >
                {username}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-kali-secondary dark:bg-synthwave-secondary rounded-md shadow-lg py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-kali-text dark:text-synthwave-text hover:bg-kali-primary dark:hover:bg-synthwave-primary"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}