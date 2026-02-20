import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

/**
 * ThemeToggle Component
 * Allows users to toggle between light and dark theme
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <div className="theme-toggle">
      <button
        className="toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <span className="theme-label">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </div>
  );
};

export default ThemeToggle;
