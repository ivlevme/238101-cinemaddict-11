import {countFilterCaterories} from "../utils/filter.js";
import {RenderPosition, render, remove} from "../utils/render.js";


import FilterComponent from "../components/filter.js";
import FilmsContainerComponent from "../components/films-container.js";
import NoFilmsComponent from "../components/no-films.js";
import FooterStatisticsComponent from "../components/footer-statistics.js";
import ProfileComponent from "../components/profile.js";
import MainNavigationComponent from "../components/main-navigation.js";
import SortComponent from "../components/sort.js";


import BoardFilmsController from "./board.js";


export default class PageController {
  constructor(headerContainer, mainContainer) {
    this._headerConatiner = headerContainer;
    this._mainConatiner = mainContainer;


    this._films = null;


    this._profileComponent = null;
    this._filterComponent = null;

    this._mainNavigationComponent = new MainNavigationComponent();
    this._mainNavigationContainer = this._mainNavigationComponent.getElement();

    this._sortComponent = new SortComponent();
  }

  render(films, profile) {
    this._films = films;
    this._profileComponent = new ProfileComponent(profile);


    render(this._headerConatiner, this._profileComponent);
    render(this._mainConatiner, this._mainNavigationComponent);

    this.renderFilters(this._films);

    render(this._mainConatiner, this._sortComponent);

    this._renderBoardFilms();
    this._renderFooterStatistics();
  }

  renderFilters(films) {
    const currentFilterCategoriesState = countFilterCaterories(films);

    if (this._filterComponent) {
      remove(this._filterComponent);
    }

    this._filterComponent = new FilterComponent(currentFilterCategoriesState);

    render(this._mainNavigationContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _renderBoardFilms() {
    if (this._films.length > 0) {
      const filmsContainerComponent = new FilmsContainerComponent();
      render(this._mainConatiner, filmsContainerComponent);

      const filmsController = new BoardFilmsController(filmsContainerComponent, this._sortComponent, this);
      filmsController.render(this._films);
      return;
    }

    render(this._mainConatiner, new NoFilmsComponent());
  }

  _renderFooterStatistics() {
    const footer = document.body.querySelector(`.footer`);
    const footerStatistics = footer.querySelector(`.footer__statistics`);

    const footerStatisticsComponent = new FooterStatisticsComponent(this._films.length);

    render(footerStatistics, footerStatisticsComponent);
  }
}
