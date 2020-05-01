import AbstractComponent from "./abstract-component.js";

import {IndexMap} from "../const.js";

const createFilterButtonMarkup = (name, count) => {
  return (`
    <a href="#${name}" class="main-navigation__item">
      ${name} <span class="main-navigation__item-count">${count}</span>
    </a>
  `).trim();
};

const createFilterButtonsMarkup = (filterState) => {
  const filterButtons = [];

  for (const filterCategoryState of filterState) {
    const name = filterCategoryState[IndexMap.KEY];
    const value = filterCategoryState[IndexMap.VALUE];

    filterButtons.push(createFilterButtonMarkup(name, value));
  }

  return filterButtons.join(`\n`);
};

const createFilterTemplate = (filterState) => {
  return (`
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createFilterButtonsMarkup(filterState)}
    </div>
  `).trim();
};


export default class Filter extends AbstractComponent {
  constructor(filterState) {
    super();

    this._filterState = filterState;
  }

  getTemplate() {
    return createFilterTemplate(this._filterState);
  }
}
