import AbstractComponent from "./abstract-component.js";


const createMainNavigationTemplate = () => {
  return (`
    <nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `).trim();
};


export default class MainNavigation extends AbstractComponent {
  constructor() {
    super();

    this._navigationStatisticsItem = this.getElement().querySelector(`.main-navigation__additional`);

    this._onChangeActiveNavgitation();
  }

  getTemplate() {
    return createMainNavigationTemplate();
  }

  _onChangeActiveNavgitation() {
    this.getElement().addEventListener(`click`, (evt) => {
      if (
        !evt.target.classList.contains(`main-navigation__additional`) &&
        this._navigationStatisticsItem.classList.contains(`main-navigation__item--active`)
      ) {
        this._navigationStatisticsItem.classList.remove(`main-navigation__item--active`);
      }
    });
  }

  setOnChange(handler) {
    this._navigationStatisticsItem.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const currentActiveNavitagionItem = this.getElement().querySelector(`.main-navigation__item--active`);
      currentActiveNavitagionItem.classList.remove(`main-navigation__item--active`);

      this._navigationStatisticsItem.classList.add(`main-navigation__item--active`);

      handler();
    });
  }
}
