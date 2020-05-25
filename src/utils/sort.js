import {SortType} from "../const.js";


const getFilmsBySort = (films, sortType) => {
  const sortingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      return sortingFilms.sort((a, b) => b.releaseDate - a.releaseDate);

    case SortType.RATING:
      return sortingFilms.sort((a, b) => b.rating - a.rating);

    case SortType.DEFAULT:
      return sortingFilms;
  }

  return sortingFilms;
};


export {getFilmsBySort};
