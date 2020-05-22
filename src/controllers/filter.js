import {FilterType, Sort} from "../const.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {getFilmsByFilter} from "../utils/filter.js";


import FilterComponent from "../components/filter.js";

export default class FilterController {
  constructor(container, filmsModel, sortController, mainNavigationComponent) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._sortController = sortController;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._menuChengeHandlers = [];

    this._mainNavigationComponent = mainNavigationComponent;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getFilmsAll();

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
      return;
    }

    render(container, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);

    this._sortController.setSortType(Sort.TYPE.DEFAULT);
    this._filmsModel.setSortType(Sort.TYPE.DEFAULT);

    this._activeFilterType = filterType;

    this._mainNavigationComponent.removeActiveClassAdditional();

    this._callHandlers(this._menuChengeHandlers);

    this.render();
  }

  _onDataChange() {
    this.render();
  }

  setMenuChangeHandler(handler) {
    this._menuChengeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
