import {Sort, FilterType} from "../const.js";

import {getFilmsByFilter, getFilmsByCategory} from "../utils/filter.js";
import {getFilmsBySort} from "../utils/sort.js";


export default class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;
    this._activeSortType = Sort.TYPE.DEFAULT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortChangeHandlers = [];
  }

  getExtraFilms(category) {
    return getFilmsByCategory(this._films, category);
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

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  updateFilm(id, film) {
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
