import {Sort, FilterType, FilterDate} from "../const.js";

import {getFilmsByFilter, getFilmsByCategory, getStatisticsByFilterDate} from "../utils/filter.js";
import {getFilmsBySort} from "../utils/sort.js";


export default class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;
    this._activeSortType = Sort.TYPE.DEFAULT;
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
    return getStatisticsByFilterDate(this._films, this._statisticsFilter);
  }

  getFilms() {
    const filteredFilms = getFilmsByFilter(this._films, this._activeFilterType);
    const sortedFilms = getFilmsBySort(filteredFilms, this._activeSortType);

    return sortedFilms;
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortChangeHandlers);
  }

  setStatisticsFilter(statisticsFilter) {
    this._statisticsFilter = statisticsFilter;
    this._callHandlers(this._statisticsFilterChangeHandlers);
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

  updateFilm(film, id) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
