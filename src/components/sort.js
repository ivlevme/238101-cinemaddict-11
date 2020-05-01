import AbstractComponent from "./abstract-component.js";

import {Sort} from "../const.js";


const createSortButtonsMarkup = (sortButtons, currenSortType) => {
  return sortButtons
    .map((sortButton) =>{
      sortButton = sortButton.toUpperCase();

      return (`
        <li>
          <a href="#" data-sort-type="${Sort.TYPE[sortButton]}" class="sort__button
            ${currenSortType === Sort.TYPE[sortButton] ? `sort__button--active` : ``}">
            ${Sort.BUTTON_TEXT[sortButton]}
          </a>
        </li>
      `).trim();
    }).join(`\n`);
};

const createSortTemplate = (currenSortType) => {
  return (`
    <ul class="sort">
      ${createSortButtonsMarkup(Sort.BUTTONS, currenSortType)}
    </ul>
  `).trim();
};


export default class SortComponent extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = Sort.TYPE.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate(this._currenSortType);
  }


  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);

      handler();
    });
  }
}
