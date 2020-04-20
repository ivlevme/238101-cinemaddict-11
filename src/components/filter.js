import {createElement} from "../util.js";


const createFilterTemplate = (name, count) => {
  return (`
    <a href="#${name}" class="main-navigation__item">
      ${name} <span class="main-navigation__item-count">${count}</span>
    </a>
  `).trim();
};


export default class Filter {
  constructor(name, count) {
    this._name = name;
    this._count = count;

    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._name, this._count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
