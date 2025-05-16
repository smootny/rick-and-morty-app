import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Character } from '../Types/Character';

type FavoritesContextType = {
  favorites: Character[];
  toggleFavorite: (character: Character) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Character[]>([]);

  const toggleFavorite = (character: Character) => {
    setFavorites(prev => {
      const exists = prev.find(c => c.id === character.id);
      return exists
        ? prev.filter(c => c.id !== character.id)
        : [...prev, character];
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some(c => c.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
