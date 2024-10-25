import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (recipe) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.find((item) => item.id === recipe.id)) {
        // Si ya existe en favoritos, eliminarlo
        return currentFavorites.filter((item) => item.id !== recipe.id);
      } else {
        // Si no existe, añadirlo
        return [...currentFavorites, recipe];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
