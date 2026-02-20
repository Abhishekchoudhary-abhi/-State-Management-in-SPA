/**
 * App Reducer
 * Manages actions for favorites/cart state management
 */

export const initialState = {
  favorites: [],
};

/**
 * Actions:
 * - ADD_ITEM: Add a project to favorites
 * - REMOVE_ITEM: Remove a project from favorites
 * - CLEAR_ITEMS: Clear all favorites
 */
export const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Check if item already exists
      const exists = state.favorites.find(item => item.id === action.payload.id);
      if (exists) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload),
      };
    }

    case 'CLEAR_ITEMS': {
      return {
        ...state,
        favorites: [],
      };
    }

    default:
      return state;
  }
};
