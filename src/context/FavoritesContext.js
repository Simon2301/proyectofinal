import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (recipe) => {
    setFavorites((currentFavorites) => {
      if (!currentFavorites.some((fav) => fav.id === recipe.id)) {
        return [...currentFavorites, recipe];
      }
      return currentFavorites;
    });
  };

  const removeFavorite = (recipeId) => {
    setFavorites((currentFavorites) => currentFavorites.filter((fav) => fav.id !== recipeId));
  };

  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.id === recipeId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
