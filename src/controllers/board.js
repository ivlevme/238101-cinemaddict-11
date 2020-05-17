import {Film, Category} from "../const.js";
import {render, remove} from "../utils/render.js";

import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmExtraComponent from "../components/film-extra.js";

import {renderFilms} from "../utils/films.js";


const FILM_INDEX_START = 0;

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const SHOWING_EXTRA_FILMS_COUNT_ON_START = 2;

const ControllerType = {
  MAIN: `main`,
  TOP_RATED: Category.TOP_RATED,
  MOST_COMMENTED: Category.MOST_COMMENTED,
};


export default class BoardController {
  constructor(container, filmsModel, commentsModel) {
    this._container = container;

    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;

    this._containerElement = this._container.getElement();
    this._buttonContainer = this._containerElement.querySelector(`.films-list`);
    this._filmsListContainer = this._containerElement.querySelector(`.films-list__container`);

    this._showedFilmControllers = {
      [ControllerType.MAIN]: [],
      [ControllerType.TOP_RATED]: [],
      [ControllerType.MOST_COMMENTED]: [],
    };

    this._filmExtraComponents = [];

    this._filmControllerTypes = Object.keys(this._showedFilmControllers);

    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
    this._filmsModel.setSortChangeHandler(this._onSortTypeChange);
  }

  render() {
    if (this._filmsModel.getFilms().length) {
      this._renderMainFilms();
      this._renderExtraFilms();
    }
  }

  _removeFilms(typeController) {
    this._showedFilmControllers[typeController].forEach((filmController) => filmController.destroy());
    this._showedFilmControllers[typeController] = [];
  }

  _removeMainFilms() {
    this._removeFilms(ControllerType.MAIN);

    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  }

  _updateMainFilms() {
    this._removeMainFilms();

    const showingFilms = this._filmsModel.getFilms()
      .slice(FILM_INDEX_START, this._showingFilmsCount);

    this._updateMainBoard(showingFilms);

    this._renderShowMoreButton();
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      this._removeFilms(ControllerType.MOST_COMMENTED);

      const mostCommentedComponentIndex = this._filmExtraComponents
      .findIndex((filmExtraComponent) => filmExtraComponent.getCategory() === Category.MOST_COMMENTED);

      if (mostCommentedComponentIndex !== -1) {
        remove(this._filmExtraComponents[mostCommentedComponentIndex]);

        this._filmExtraComponents = [].concat(
            this._filmExtraComponents.slice(0, mostCommentedComponentIndex),
            this._filmExtraComponents.slice(mostCommentedComponentIndex + 1)
        );
      }

      this._updateAllControllers(oldData, newData);
      this._renderExtraCategory(Category.MOST_COMMENTED);
    }
  }

  _callControllers(cb) {
    this._filmControllerTypes.forEach((controllerType) => {
      this._showedFilmControllers[controllerType].forEach(cb);
    });
  }

  _updateAllControllers(oldData, newData) {
    this._callControllers((filmController) => {
      if (filmController.getFilm() === oldData) {
        filmController.render(newData);
      }
    });
  }

  _onViewChange() {
    this._callControllers((filmController) => filmController.setDefaultView());
  }

  _renderMainFilms() {
    this._updateMainFilms();
  }

  _renderExtraFilms() {
    Film.CATEGORY.forEach((category) => {
      this._renderExtraCategory(category);
    });
  }

  _renderExtraCategory(category) {
    const showingFilms = this._filmsModel.getExtraFilms(category)
          .slice(0, SHOWING_EXTRA_FILMS_COUNT_ON_START);

    if (showingFilms.length > 0) {
      const filmExtraComponent = new FilmExtraComponent(category);
      this._filmExtraComponents.push(filmExtraComponent);

      const filmExtraContainer = filmExtraComponent.getElement()
        .querySelector(`.films-list__container`);

      const newFilms = renderFilms(showingFilms, filmExtraContainer, this._commentsModel, this._onDataChange,
          this._onViewChange);

      this._showedFilmControllers[category] = this._showedFilmControllers[category].concat(newFilms);

      render(this._containerElement, filmExtraComponent);
    }
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    render(this._buttonContainer, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const films = this._filmsModel.getFilms();

      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const showingFilms = this._filmsModel.getFilms()
        .slice(prevFilmsCount, this._showingFilmsCount);

      this._updateMainBoard(showingFilms);

      if (this._showingFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _updateMainBoard(films) {
    const newFilms = renderFilms(films, this._filmsListContainer, this._commentsModel, this._onDataChange,
        this._onViewChange);

    this._showedFilmControllers.main = this._showedFilmControllers.main.concat(newFilms);
  }

  _onSortTypeChange() {
    this._updateMainFilms();
  }


  _onFilterChange() {
    this._updateMainFilms();
  }
}
