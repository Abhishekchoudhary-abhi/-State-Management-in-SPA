import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

/**
 * Home Page
 * Welcome page with introduction and theme display
 */
const Home = () => {
  const { theme, favorites } = useContext(AppContext);

  return (
    <main className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Academic Experiment 4</h1>
          <p className="subtitle">State Management in Single Page Applications</p>
          
          <div className="intro-box">
            <h2>Welcome! 👋</h2>
            <p>
              This application demonstrates advanced React hooks and state management patterns including:
            </p>
            <ul className="features-list">
              <li><strong>React Router</strong> - Multi-page navigation</li>
              <li><strong>useContext</strong> - Global state management for theme and favorites</li>
              <li><strong>useReducer</strong> - Structured state updates with actions</li>
              <li><strong>useMemo</strong> - Performance optimization for derived calculations</li>
              <li><strong>Responsive Design</strong> - Works on mobile and desktop</li>
            </ul>
          </div>

          <div className="stats-container">
            <div className="stat-box">
              <span className="stat-icon">❤️</span>
              <div>
                <p className="stat-label">Favorites</p>
                <p className="stat-value">{favorites.length}</p>
              </div>
            </div>
            
            <div className="stat-box">
              <span className="stat-icon">🎨</span>
              <div>
                <p className="stat-label">Theme</p>
                <p className="stat-value">{theme === 'light' ? '☀️ Light' : '🌙 Dark'}</p>
              </div>
            </div>

            <div className="stat-box">
              <span className="stat-icon">⚛️</span>
              <div>
                <p className="stat-label">Status</p>
                <p className="stat-value">Active</p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <a href="/projects" className="btn btn-primary">
              Explore Projects →
            </a>
            <a href="/analytics" className="btn btn-secondary">
              View Analytics →
            </a>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2>How It Works</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>🎯 Context API</h3>
            <p>Global theme and favorites state accessible throughout the app without prop drilling.</p>
          </div>
          <div className="info-card">
            <h3>⚙️ Reducer Pattern</h3>
            <p>Predictable state updates using ADD_ITEM, REMOVE_ITEM, and CLEAR_ITEMS actions.</p>
          </div>
          <div className="info-card">
            <h3>⚡ Memoization</h3>
            <p>useMemo optimizes expensive calculations like total count and analytics summaries.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
