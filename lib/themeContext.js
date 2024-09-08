import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('synthwave');

  useEffect(() => {
    // Check if there's a saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setThemeName(savedTheme);
    }

    // Apply the theme
    if (themeName === 'synthwave') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeName]);

  const toggleTheme = () => {
    const newTheme = themeName === 'kali' ? 'synthwave' : 'kali';
    setThemeName(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);