import {FilterType, Category} from "../const.js";


const MIN_RATING = 0;
const MIN_COUNT_COMMENTS = 0;


const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;

    case FilterType.WATCHLIST:
      return films.filter((film) => film.isWatchlist);

    case FilterType.HISTORY:
      return films.filter((film) => film.isWatched);

    case FilterType.FAVORITES:
      return films.filter((film) => film.isFavorites);
  }

  return films;
};

const getFilmsByCategory = (films, category) => {
  switch (category) {
    case Category.TOP_RATED:
      return films.slice()
        .sort((a, b) => b.rating - a.rating)
        .filter((film) => film.rating > MIN_RATING);

    case Category.MOST_COMMENTED:
      return films.slice()
        .sort((a, b) => b.comments.length - a.comments.length)
        .filter((film) => film.comments.length > MIN_COUNT_COMMENTS);
  }

  return false;
};


export {getFilmsByFilter, getFilmsByCategory};
