import {FilterType, Category, FilterDate} from "../const.js";

import moment from "moment";


const MIN_RATING = 0;
const MIN_COUNT_COMMENTS = 0;
const MIN_DURATION = 0;

const COUNT_ONE_GENRE = 1;

const ONE_TIME_UNIT = 1;
const COUNT_DAYS_IN_WEEK = 7;


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

const getFilmsByFilterDate = (films, filterDate) => {
  const today = new Date();

  switch (filterDate) {
    case FilterDate.ALL_TIME:
      return films;

    case FilterDate.TODAY:
      const yesterday = moment().subtract(ONE_TIME_UNIT, `d`).toDate();
      return films.filter((film) => film.watchingDate <= today && film.watchingDate >= yesterday);

    case FilterDate.WEEK:
      const weekAgo = moment().subtract(COUNT_DAYS_IN_WEEK, `d`).toDate();
      return films.filter((film) => film.watchingDate <= today && film.watchingDate >= weekAgo);

    case FilterDate.MONTH:
      const monthAgo = moment().subtract(ONE_TIME_UNIT, `M`).toDate();
      return films.filter((film) => film.watchingDate <= today && film.watchingDate >= monthAgo);

    case FilterDate.YEAR:
      const yearAgo = moment().subtract(ONE_TIME_UNIT, `y`).toDate();
      return films.filter((film) => film.watchingDate <= today && film.watchingDate >= yearAgo);
  }

  return films;
};

const getStatisticsByFilterDate = (films, activeFilterDate, userRank) => {
  const watchedFilms = films.filter((film) => film.isWatched);
  const filmsByFilterDate = getFilmsByFilterDate(watchedFilms, activeFilterDate);

  const statistic = {
    countWatchedFilms: filmsByFilterDate.length,
    totalDuration: MIN_DURATION,
    genres: {},
    activeFilter: activeFilterDate,
    userRank,
  };

  filmsByFilterDate.forEach((film) => {
    statistic.totalDuration += film.runtime;

    film.genres.forEach((genre) => {
      statistic.genres[genre] = statistic.genres[genre] ?
        statistic.genres[genre] + COUNT_ONE_GENRE : COUNT_ONE_GENRE;
    });
  });

  return statistic;
};


export {getFilmsByFilter, getFilmsByCategory, getStatisticsByFilterDate};
