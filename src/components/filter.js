import AbstractComponent from "./abstract-component.js";


const createFilterTemplate = (name, count) => {
  return (`
    <a href="#${name}" class="main-navigation__item">
      ${name} <span class="main-navigation__item-count">${count}</span>
    </a>
  `).trim();
};


export default class Filter extends AbstractComponent {
  constructor(name, count) {
    super();

    this._name = name;
    this._count = count;
  }

  getTemplate() {
    return createFilterTemplate(this._name, this._count);
  }
}
