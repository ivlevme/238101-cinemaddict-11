import {render} from "../utils/render.js";

import FilmsContainerComponent from "../components/films-container.js";
import NoFilmsComponent from "../components/no-films.js";
import FooterStatisticsComponent from "../components/footer-statistics.js";
import ProfileComponent from "../components/profile.js";
import MainNavigationComponent from "../components/main-navigation.js";


import BoardController from "./board.js";
import FilterController from "./filter.js";
import SortController from "./sort.js";


export default class PageController {
  constructor(headerContainer, mainContainer, footerContainer, filmsModel) {
    this._headerConatiner = headerContainer;
    this._mainConatiner = mainContainer;
    this._footerContainer = footerContainer;

    this._filmsModel = filmsModel;

    this._profileComponent = null;

    this._mainNavigationComponent = new MainNavigationComponent();
    this._mainNavigationContainer = this._mainNavigationComponent.getElement();

    this._filmsContainerComponent = new FilmsContainerComponent();

    this._boardController = new BoardController(this._filmsContainerComponent, this._filmsModel);
    this._sortController = new SortController(this._mainConatiner, this._filmsModel);
    this._filterController = new FilterController(this._mainNavigationContainer, this._filmsModel,
        this._sortController);
  }

  render(profile) {
    this._profileComponent = new ProfileComponent(profile);


    render(this._headerConatiner, this._profileComponent);
    render(this._mainConatiner, this._mainNavigationComponent);

    this._filterController.render();
    this._sortController.render();

    this._renderBoardFilms();
    this._renderFooterStatistics();
  }

  _renderBoardFilms() {
    if (this._filmsModel.getFilms().length > 0) {
      render(this._mainConatiner, this._filmsContainerComponent);

      this._boardController.render();
      return;
    }

    render(this._mainConatiner, new NoFilmsComponent());
  }

  _renderFooterStatistics() {
    const footerStatistics = this._footerContainer.querySelector(`.footer__statistics`);

    const footerStatisticsComponent = new FooterStatisticsComponent(this._filmsModel.getFilms().length);

    render(footerStatistics, footerStatisticsComponent);
  }
}
