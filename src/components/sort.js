import AbstractComponent from "./abstract-component.js";

import {Sort} from "../const.js";


const createSortButtonsMarkup = (sortButtons, activeSortType) => {
  return sortButtons
    .map((sortButton) =>{
      sortButton = sortButton.toUpperCase();

      return (`
        <li>
          <a href="#" data-sort-type="${Sort.TYPE[sortButton]}" class="sort__button
            ${activeSortType === Sort.TYPE[sortButton] ? `sort__button--active` : ``}">
            ${Sort.BUTTON_TEXT[sortButton]}
          </a>
        </li>
      `).trim();
    }).join(`\n`);
};

const createSortTemplate = (activeSortType) => {
  return (`
    <ul class="sort">
      ${createSortButtonsMarkup(Sort.BUTTONS, activeSortType)}
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
