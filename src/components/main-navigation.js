import AbstractComponent from "./abstract-component.js";


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


export default class MainNavigation extends AbstractComponent {
  getTemplate() {
    return createMainNavigationTemplate();
  }
}
