import {render, replace} from "../utils/render.js";
import {EMPTY_ARRAY_LENGTH, FilterDate} from "../const.js";

import FilmsModel from "../models/films.js";
import CommentsModel from "../models/comments.js";

import FilmsContainerComponent from "../components/films-container.js";
import NoFilmsComponent from "../components/no-films.js";
import FilmsLoadingComponent from "../components/films-loading.js";
import FooterStatisticsComponent from "../components/footer-statistics.js";
import ProfileComponent from "../components/profile.js";
import MainNavigationComponent from "../components/main-navigation.js";

import BoardController from "./board.js";
import FilterController from "./filter.js";
import SortController from "./sort.js";
import StatisticsController from "./statistics.js";


export default class PageController {
  constructor(headerContainer, mainContainer, footerContainer, api) {
    this._headerConatiner = headerContainer;
    this._mainConatiner = mainContainer;
    this._footerContainer = footerContainer;

    this._footerStatistics = this._footerContainer.querySelector(`.footer__statistics`);

    this._api = api;

    this._filmsModel = new FilmsModel();
    this._commentsModel = new CommentsModel();

    this._profileComponent = new ProfileComponent(this._filmsModel.getUserRank());

    this._mainNavigationComponent = new MainNavigationComponent();
    this._mainNavigationContainer = this._mainNavigationComponent.getElement();

    this._footerStatisticsComponent = new FooterStatisticsComponent(this._filmsModel.getFilms().length);

    this._filmsContainerComponent = new FilmsContainerComponent();
    this._filmsLoadingComponent = new FilmsLoadingComponent();
    this._noFilmsComponent = new NoFilmsComponent();

    this._boardController = new BoardController(this._filmsContainerComponent, this, this._filmsModel,
        this._commentsModel, this._api);
    this._sortController = new SortController(this._mainConatiner, this._filmsModel);
    this._filterController = new FilterController(this._mainNavigationContainer, this._filmsModel,
        this._sortController, this._mainNavigationComponent);
    this._statisticsController = new StatisticsController(this._mainConatiner, this._filmsModel);


    this._onMenuChange = this._onMenuChange.bind(this);

    this._filterController.setMenuChangeHandler(this._onMenuChange);
  }

  render() {
    this._api.getFilms()
      .then((films) => {
        this._filmsModel.setFilms(films);
        this._renderBoardFilms();

        this.updateProfileComponent(this._filmsModel.getUserRank());

        const countFilms = this._filmsModel.getFilms().length;

        const oldFooterStatisticsComponent = this._footerStatisticsComponent;
        this._footerStatisticsComponent = new FooterStatisticsComponent(countFilms);
        replace(this._footerStatisticsComponent, oldFooterStatisticsComponent);

        this._statisticsController.render();
      })
      .catch(() => {
        replace(this._noFilmsComponent, this._filmsLoadingComponent);
      });

    render(this._headerConatiner, this._profileComponent);
    render(this._mainConatiner, this._mainNavigationComponent);

    this._filterController.render();
    this._sortController.render();

    render(this._mainConatiner, this._filmsLoadingComponent);
    render(this._footerStatistics, this._footerStatisticsComponent);

    this._statisticsController.render();

    this._mainNavigationComponent.setOnChange(() => {
      this._boardController.hide();
      this._sortController.hide();
      this._noFilmsComponent.hide();

      this._statisticsController.setStatisticsFilter(FilterDate.ALL_TIME);
      this._statisticsController.show();
    });
  }

  updateProfileComponent(rank) {
    const oldProfileComponent = this._profileComponent;
    this._profileComponent = new ProfileComponent(rank);
    replace(this._profileComponent, oldProfileComponent);
  }

  manageCommentsForm(status) {
    this._boardController.manageCommentsForm(status);
  }

  _renderBoardFilms() {
    if (this._filmsModel.getFilms().length > EMPTY_ARRAY_LENGTH) {
      replace(this._filmsContainerComponent, this._filmsLoadingComponent);

      this._boardController.render();
      return;
    }

    replace(this._noFilmsComponent, this._filmsLoadingComponent);
  }

  _onMenuChange() {
    this._noFilmsComponent.show();
    this._sortController.show();
    this._boardController.show();

    this._statisticsController.hide();
  }
}
