import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

/**
 * Navbar Component
 * Displays navigation links and favorites count
 */
const Navbar = () => {
  const { favorites } = useContext(AppContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          ⚛️ React App
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/analytics" className="nav-link">Analytics</Link>
        </div>

        <div className="favorites-badge">
          ❤️ {favorites.length}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
