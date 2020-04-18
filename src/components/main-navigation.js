import {createElement} from "../util.js";


const createMainNavigationTemplate = () => {
  return (`
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `).trim();
};


export default class MainNavigation {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate();
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
