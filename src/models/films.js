import {INDEX_FIRST_ELEMENT_IN_ARRAY, INDEX_NEXT_ELEMENT_IN_ARRAY, INDEX_MISS_ELEMENT, SortType,
  FilterType, FilterDate, UserRank, RankRatio} from "../const.js";

import {callHandlers} from "../utils/common.js";

import {getFilmsByFilter, getFilmsByCategory, getStatisticsByFilterDate} from "../utils/filter.js";
import {getFilmsBySort} from "../utils/sort.js";


export default class Films {
  constructor() {
    this._films = [];

    this._userRank = UserRank.NONE;
    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;
    this._statisticsFilter = FilterDate.ALL_TIME;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortChangeHandlers = [];
    this._statisticsFilterChangeHandlers = [];
  }

  getExtraFilms(category) {
    return getFilmsByCategory(this._films, category);
  }

  getStatistics() {
    return getStatisticsByFilterDate(this._films, this._statisticsFilter, this._userRank);
  }

  getUserRank() {
    return this._userRank;
  }

  getFilms() {
    const filteredFilms = getFilmsByFilter(this._films, this._activeFilterType);
    const sortedFilms = getFilmsBySort(filteredFilms, this._activeSortType);

    return sortedFilms;
  }

  getFilmsAll() {
    return this._films;
  }

  updateFilm(film, id) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === INDEX_MISS_ELEMENT) {
      return false;
    }

    this._films = [].concat(
        this._films.slice(INDEX_FIRST_ELEMENT_IN_ARRAY, index),
        film,
        this._films.slice(index + INDEX_NEXT_ELEMENT_IN_ARRAY)
    );

    this._userRank = this._setUserRank(this._films);

    callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._userRank = this._setUserRank(films);

    callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    callHandlers(this._filterChangeHandlers);
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    callHandlers(this._sortChangeHandlers);
  }

  setStatisticsFilter(statisticsFilter) {
    this._statisticsFilter = statisticsFilter;
    callHandlers(this._statisticsFilterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  setStatisticsFilterChangeHandler(handler) {
    this._statisticsFilterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _setUserRank(films) {
    const countWatchedFilms = films.filter((film) => film.isWatched).length;

    if (countWatchedFilms > RankRatio.NONE && countWatchedFilms <= RankRatio.NOVICE) {
      return UserRank.NOVICE;
    }

    if (countWatchedFilms > RankRatio.NOVICE && countWatchedFilms <= RankRatio.FAN) {
      return UserRank.FAN;
    }

    if (countWatchedFilms > RankRatio.FAN) {
      return UserRank.MOVIE_BUFF;
    }

    return UserRank.NONE;
  }
}
