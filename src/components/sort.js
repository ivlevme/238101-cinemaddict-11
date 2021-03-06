import AbstractComponent from "./abstract-component.js";

import {SORT_BUTTONS, SortType, SortButtonText} from "../const.js";


const createSortButtonsMarkup = (sortButtons, activeSortType) => {
  return sortButtons
    .map((sortButton) =>{
      sortButton = sortButton.toUpperCase();

      return (`
        <li>
          <a href="#" data-sort-type="${SortType[sortButton]}" class="sort__button
            ${activeSortType === SortType[sortButton] ? `sort__button--active` : ``}">
            ${SortButtonText[sortButton]}
          </a>
        </li>
      `).trim();
    }).join(`\n`);
};

const createSortTemplate = (activeSortType) => {
  return (`
    <ul class="sort">
      ${createSortButtonsMarkup(SORT_BUTTONS, activeSortType)}
    </ul>
  `).trim();
};


export default class SortComponent extends AbstractComponent {
  constructor(activeSortType) {
    super();

    this._activeSortType = activeSortType;
  }

  getTemplate() {
    return createSortTemplate(this._activeSortType);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._activeSortType === sortType) {
        return;
      }

      this._activeSortType = sortType;

      handler(this._activeSortType);
    });
  }
}
