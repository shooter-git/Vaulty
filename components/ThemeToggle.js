import React from 'react';
import { useTheme } from '../lib/themeContext';

const ThemeToggle = () => {
  const { themeName, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="fixed bottom-5 right-5 z-50 px-4 py-2 rounded-full bg-kali-accent dark:bg-synthwave-accent text-kali-text dark:text-synthwave-text transition-colors duration-200 hover:bg-opacity-80"
    >
      Switch to {themeName === 'kali' ? 'Synthwave' : 'Kali'} theme
    </button>
  );
};

export default ThemeToggle;