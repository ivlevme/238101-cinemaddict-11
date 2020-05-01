import {FILTER_CATEGORIES} from "../const.js";


const FilmFilterCategory = {
  WATCHLIST: `isWatchlist`,
  HISTORY: `isWatched`,
  FAVORITES: `isFavorites`,
};


const countFilterCaterories = (films) => {
  const state = new Map();

  FILTER_CATEGORIES.forEach((category) => {
    state.set(category, 0);
  });

  films.forEach((film) => {
    FILTER_CATEGORIES.forEach((category) => {
      const currentCategory = FilmFilterCategory[category.toUpperCase()];

      state.set(category, film[currentCategory] ? state.get(category) + 1 : state.get(category));
    });
  });

  return state;
};


export {countFilterCaterories};
