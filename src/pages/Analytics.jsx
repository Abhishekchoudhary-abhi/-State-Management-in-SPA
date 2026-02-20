import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';

/**
 * Analytics Page (NEW)
 * Demonstrates the combination of:
 * - Context (reading favorites state)
 * - Reducer (dispatch CLEAR_ITEMS action)
 * - useMemo (derived calculations for analytics)
 */
const Analytics = () => {
  const { favorites, dispatch } = useContext(AppContext);

  /**
   * useMemo: Optimize expensive analytics calculations
   * Recalculates only when favorites array changes
   */
  const analyticsData = useMemo(() => {
    const calculateStats = () => {
      const totalFavorites = favorites.length;
      const techStack = {};
      const categories = {
        backend: 0,
        frontend: 0,
        fullstack: 0,
      };

      // Count tech stack usage
      favorites.forEach(project => {
        const techs = project.tech.split(', ');
        techs.forEach(tech => {
          techStack[tech] = (techStack[tech] || 0) + 1;
        });

        // Categorize projects
        const tech = project.tech.toLowerCase();
        if (tech.includes('react') || tech.includes('vue') || tech.includes('angular')) {
          categories.frontend += 1;
        } else if (tech.includes('node') || tech.includes('django') || tech.includes('express')) {
          categories.backend += 1;
        } else {
          categories.fullstack += 1;
        }
      });

      const topTechs = Object.entries(techStack)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tech, count]) => ({ tech, count }));

      return {
        totalFavorites,
        techStack,
        topTechs,
        categories,
        averageLength: totalFavorites > 0
          ? (favorites.reduce((acc, p) => acc + p.description.length, 0) / totalFavorites).toFixed(0)
          : 0,
      };
    };

    return calculateStats();
  }, [favorites]);

  // Handle clear favorites using reducer
  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      dispatch({ type: 'CLEAR_ITEMS' });
    }
  };

  return (
    <main className="page analytics-page">
      <section className="page-header">
        <h1>Analytics Dashboard</h1>
        <p>Insights about your favorite projects</p>
      </section>

      {favorites.length === 0 ? (
        <section className="empty-analytics">
          <div className="empty-state-box">
            <p>📊 No favorites yet!</p>
            <p>Go to <a href="/projects">Projects</a> and add some projects to your favorites to see analytics.</p>
          </div>
        </section>
      ) : (
        <>
          {/* Overview Cards */}
          <section className="analytics-overview">
            <div className="analytics-card large">
              <h3>Total Favorites</h3>
              <p className="metric-value">{analyticsData.totalFavorites}</p>
              <p className="metric-label">projects added</p>
            </div>

            <div className="analytics-card">
              <h3>Avg Description Length</h3>
              <p className="metric-value">{analyticsData.averageLength}</p>
              <p className="metric-label">characters</p>
            </div>

            <div className="analytics-card">
              <h3>Unique Tech Count</h3>
              <p className="metric-value">{Object.keys(analyticsData.techStack).length}</p>
              <p className="metric-label">technologies</p>
            </div>
          </section>

          {/* Category Distribution */}
          <section className="analytics-section">
            <h2>Project Categories</h2>
            <div className="category-grid">
              <div className="category-item">
                <span className="category-icon">⚛️</span>
                <h3>Frontend</h3>
                <p className="category-count">{analyticsData.categories.frontend}</p>
              </div>
              <div className="category-item">
                <span className="category-icon">🔧</span>
                <h3>Backend</h3>
                <p className="category-count">{analyticsData.categories.backend}</p>
              </div>
              <div className="category-item">
                <span className="category-icon">🚀</span>
                <h3>Full Stack</h3>
                <p className="category-count">{analyticsData.categories.fullstack}</p>
              </div>
            </div>
          </section>

          {/* Top Technologies */}
          <section className="analytics-section">
            <h2>Top Technologies Used</h2>
            <div className="tech-list">
              {analyticsData.topTechs.map((item, index) => (
                <div key={index} className="tech-item">
                  <span className="tech-rank">{index + 1}</span>
                  <span className="tech-name">{item.tech}</span>
                  <div className="tech-bar">
                    <div
                      className="tech-bar-fill"
                      style={{
                        width: `${(item.count / analyticsData.totalFavorites) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="tech-count">{item.count}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Favorite Projects List */}
          <section className="analytics-section">
            <h2>Your Favorite Projects</h2>
            <div className="favorites-table">
              <div className="table-header">
                <span className="col-name">Project Name</span>
                <span className="col-tech">Tech Stack</span>
              </div>
              {favorites.map(project => (
                <div key={project.id} className="table-row">
                  <span className="col-name">{project.name}</span>
                  <span className="col-tech">{project.tech}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <section className="analytics-actions">
            <button
              className="btn btn-primary"
              onClick={() => window.print()}
              title="Print analytics report"
            >
              📄 Print Report
            </button>
            <button
              className="btn btn-danger"
              onClick={handleClearFavorites}
              title="Clear all favorites"
            >
              🗑️ Clear All Favorites
            </button>
          </section>
        </>
      )}

      {/* Performance Note */}
      <div className="performance-note">
        <p>
          💡 <strong>Performance Tip:</strong> This page uses <code>useMemo</code> to optimize the analytics calculations.
          The calculations only recompute when the favorites array changes, improving performance on large datasets.
        </p>
      </div>
    </main>
  );
};

export default Analytics;
