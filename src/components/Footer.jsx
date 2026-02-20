import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

/**
 * Footer Component
 * Displays footer with theme toggle
 */
const Footer = () => {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; 2024 Academic Experiment 4. All rights reserved.</p>
          <p>React State Management with Hooks</p>
        </div>
        
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
