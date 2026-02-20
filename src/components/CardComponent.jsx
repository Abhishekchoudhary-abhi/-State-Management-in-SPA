import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

/**
 * CardComponent
 * Displays a project card with add/remove favorite functionality
 */
const CardComponent = ({ project }) => {
  const { favorites, dispatch } = useContext(AppContext);

  const isFavorite = favorites.some(fav => fav.id === project.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: 'REMOVE_ITEM',
        payload: project.id,
      });
    } else {
      dispatch({
        type: 'ADD_ITEM',
        payload: project,
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{project.name}</h3>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleToggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <p className="card-description">{project.description}</p>

      <div className="card-footer">
        <span className="card-tech">{project.tech}</span>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="card-link">
          View →
        </a>
      </div>
    </div>
  );
};

export default CardComponent;
