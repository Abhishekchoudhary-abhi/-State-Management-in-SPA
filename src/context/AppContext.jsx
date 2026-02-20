import React, { createContext, useReducer, useState } from 'react';
import { appReducer, initialState } from '../reducer/appReducer';

// Create the context
export const AppContext = createContext();

/**
 * AppProvider Component
 * Wraps the entire app and provides:
 * - Global theme state (light/dark)
 * - Global favorites/cart state via reducer
 */
export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    toggleTheme,
    favorites: state.favorites,
    dispatch,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
