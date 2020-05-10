import AbstractComponent from "./abstract-component.js";

import {FilterType} from "../const.js";


const FilterName = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};


const createFilterCountMarkup = (count) => {
  return (`
    <span class="main-navigation__item-count">${count}</span>
  `).trim();
};

const createFilterButtonsMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return (`
    <a href="#${name}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}" data-filter-type ="${name}">
      ${FilterName[name.toUpperCase()]} ${name === FilterType.ALL ? `` : createFilterCountMarkup(count)}
    </a>
  `).trim();
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filter) => createFilterButtonsMarkup(filter, filter.checked));

  return (`
    <div class="main-navigation__items">
      ${filtersMarkup.join(`\n`)}
    </div>
  `).trim();
};


export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      evt.preventDefault();

      const filterName = evt.target.dataset.filterType;
      handler(filterName);
    });
  }
}
