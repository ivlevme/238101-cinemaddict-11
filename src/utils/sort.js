import {Sort} from "../const.js";


const getFilmsBySort = (films, sortType) => {
  const sortingFilms = films.slice();

  switch (sortType) {
    case Sort.TYPE.DATE:
      return sortingFilms.sort((a, b) => b.releaseDate - a.releaseDate);

    case Sort.TYPE.RATING:
      return sortingFilms.sort((a, b) => b.rating - a.rating);

    case Sort.TYPE.DEFAULT:
      return sortingFilms;
  }

  return sortingFilms;
};


export {getFilmsBySort};
