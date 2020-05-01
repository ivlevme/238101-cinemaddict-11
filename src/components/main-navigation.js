import AbstractComponent from "./abstract-component.js";


const createMainNavigationTemplate = () => {
  return (`
    <nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `).trim();
};


export default class MainNavigation extends AbstractComponent {
  getTemplate() {
    return createMainNavigationTemplate();
  }
}
