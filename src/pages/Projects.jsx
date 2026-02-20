import React, { useContext, useMemo } from 'react';
import CardComponent from '../components/CardComponent';
import { AppContext } from '../context/AppContext';

/**
 * Projects Page
 * Displays a list of projects that can be added to favorites
 * Uses useMemo to optimize the filtered project list
 */
const Projects = () => {
  const { favorites } = useContext(AppContext);

  // Sample projects data
  const allProjects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js backend',
      tech: 'React, Node.js, MongoDB',
      link: '#',
    },
    {
      id: 2,
      name: 'Social Media App',
      description: 'Real-time social networking application with REST API',
      tech: 'React, Express, PostgreSQL',
      link: '#',
    },
    {
      id: 3,
      name: 'Task Management Tool',
      description: 'Collaborative to-do list with real-time updates',
      tech: 'React, Firebase, Tailwind CSS',
      link: '#',
    },
    {
      id: 4,
      name: 'Weather Dashboard',
      description: 'Weather app with geolocation and forecast data',
      tech: 'React, Weather API, Charts.js',
      link: '#',
    },
    {
      id: 5,
      name: 'Blog Platform',
      description: 'Content management system for creating and sharing articles',
      tech: 'React, Strapi CMS, GraphQL',
      link: '#',
    },
    {
      id: 6,
      name: 'Fitness Tracker',
      description: 'Track workouts and monitor personal fitness goals',
      tech: 'React Native, Django, SQLite',
      link: '#',
    },
  ];

  // useMemo: Optimize filtered list and derived calculations
  const projectStats = useMemo(() => {
    const favoriteIds = new Set(favorites.map(fav => fav.id));
    const favoriteProjects = allProjects.filter(p => favoriteIds.has(p.id));
    
    return {
      totalProjects: allProjects.length,
      favoriteCount: favorites.length,
      unFavoritedCount: allProjects.length - favorites.length,
      favoriteProjects,
    };
  }, [favorites]);

  return (
    <main className="page projects-page">
      <section className="page-header">
        <h1>Featured Projects</h1>
        <p>Explore our collection of innovative projects</p>
      </section>

      <section className="projects-stats">
        <div className="stat">
          <span className="stat-num">{projectStats.totalProjects}</span>
          <span className="stat-label">Total Projects</span>
        </div>
        <div className="stat">
          <span className="stat-num">{projectStats.favoriteCount}</span>
          <span className="stat-label">Favorited</span>
        </div>
        <div className="stat">
          <span className="stat-num">{projectStats.unFavoritedCount}</span>
          <span className="stat-label">Not Favorited</span>
        </div>
      </section>

      <section className="projects-grid">
        <h2>All Projects</h2>
        <div className="cards-container">
          {allProjects.map(project => (
            <CardComponent key={project.id} project={project} />
          ))}
        </div>
      </section>

      {projectStats.favoriteCount > 0 && (
        <section className="favorites-preview">
          <h2>Your Favorite Projects ({projectStats.favoriteCount})</h2>
          <div className="cards-container">
            {projectStats.favoriteProjects.map(project => (
              <CardComponent key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {projectStats.favoriteCount === 0 && (
        <section className="empty-state">
          <p>👆 Start adding projects to your favorites by clicking the heart icon!</p>
        </section>
      )}
    </main>
  );
};

export default Projects;
