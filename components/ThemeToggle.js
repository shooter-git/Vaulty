import React from 'react';
import { useTheme } from '../lib/themeContext';

const ThemeToggle = () => {
  const { themeName, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="px-3 py-1 flex items-center justify-center rounded bg-kali-accent dark:bg-synthwave-accent text-kali-primary dark:text-synthwave-primary transition-colors duration-200 hover:bg-opacity-80 font-mono text-sm"
    >
      {themeName === 'kali' ? 'C:\\' : '>'}
    </button>
  );
};

export default ThemeToggle;