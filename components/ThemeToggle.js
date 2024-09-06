import React from 'react';
import { useTheme } from '../lib/themeContext';

const ThemeToggle = () => {
  const { themeName, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full bg-kali-accent dark:bg-synthwave-accent text-kali-text dark:text-synthwave-text transition-colors duration-200 hover:bg-opacity-80"
    >
      {themeName === 'kali' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;