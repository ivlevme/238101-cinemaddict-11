import {FILM_CATEGORIES, EMPTY_ARRAY_LENGTH, INDEX_FIRST_ELEMENT_IN_ARRAY, INDEX_NEXT_ELEMENT_IN_ARRAY,
  INDEX_MISS_ELEMENT, Category} from "../const.js";

import {shake} from "../utils/common.js";
import {render, remove} from "../utils/render.js";

import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmExtraComponent from "../components/film-extra.js";

import {renderFilms} from "../utils/films.js";


const FILM_INDEX_START = 0;


const ShowingFilmsCount = {
  BY_BUTTON: 5,
  MAIN_ON_START: 5,
  EXTRA_ON_START: 2,
};

const ControllerType = {
  MAIN: `main`,
  TOP_RATED: Category.TOP_RATED,
  MOST_COMMENTED: Category.MOST_COMMENTED,
};


export default class BoardController {
  constructor(container, pageController, filmsModel, commentsModel, api) {
    this._container = container;

    this._pageController = pageController;

    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;

    this._api = api;

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

    this._showingFilmsCount = ShowingFilmsCount.MAIN_ON_START;

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

  manageCommentsForm(disableStatus) {
    if (disableStatus) {
      this._callControllers((filmController) => {
        filmController.disableCommentsForm();
      });

      return;
    }

    this._callControllers((filmController) => {
      filmController.enableCommentsForm();
    });
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  _removeFilms(typeController) {
    this._showedFilmControllers[typeController].forEach((filmController) => filmController.destroy());
    this._showedFilmControllers[typeController] = [];
  }

  _removeMainFilms() {
    this._removeFilms(ControllerType.MAIN);

    this._showingFilmsCount = ShowingFilmsCount.MAIN_ON_START;
  }

  _updateMainFilms() {
    this._removeMainFilms();

    const showingFilms = this._filmsModel.getFilms()
      .slice(FILM_INDEX_START, this._showingFilmsCount);

    this._updateMainBoard(showingFilms);

    this._renderShowMoreButton();
  }

  _onDataChange(oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
      .then((filmModel) => {
        const isSuccess = this._filmsModel.updateFilm(filmModel, oldData.id);

        if (isSuccess) {
          this._pageController.updateProfileComponent(this._filmsModel.getUserRank());

          this._removeFilms(ControllerType.MOST_COMMENTED);

          const mostCommentedComponentIndex = this._filmExtraComponents
          .findIndex((filmExtraComponent) => filmExtraComponent.getCategory() === Category.MOST_COMMENTED);

          if (mostCommentedComponentIndex !== INDEX_MISS_ELEMENT) {
            remove(this._filmExtraComponents[mostCommentedComponentIndex]);

            this._filmExtraComponents = [].concat(
                this._filmExtraComponents.slice(INDEX_FIRST_ELEMENT_IN_ARRAY, mostCommentedComponentIndex),
                this._filmExtraComponents.slice(mostCommentedComponentIndex + INDEX_NEXT_ELEMENT_IN_ARRAY)
            );
          }

          this._updateAllControllers(oldData, newData);
          this._renderExtraCategory(Category.MOST_COMMENTED);
        }
      })
      .catch(() => {
        this._callControllers((filmController) => {
          if (filmController.getFilm().id === oldData.id) {
            shake(filmController.getDetailsPopupComponent());
            shake(filmController.getFilmCardComponent());
          }
        });
      });
  }

  _renderMainFilms() {
    this._updateMainFilms();
  }

  _renderExtraFilms() {
    FILM_CATEGORIES.forEach((category) => {
      this._renderExtraCategory(category);
    });
  }

  _renderExtraCategory(category) {
    const showingFilms = this._filmsModel.getExtraFilms(category)
          .slice(INDEX_FIRST_ELEMENT_IN_ARRAY, ShowingFilmsCount.EXTRA_ON_START);

    if (showingFilms.length > EMPTY_ARRAY_LENGTH) {
      const filmExtraComponent = new FilmExtraComponent(category);
      this._filmExtraComponents.push(filmExtraComponent);

      const filmExtraContainer = filmExtraComponent.getElement()
        .querySelector(`.films-list__container`);

      const newFilms = renderFilms(showingFilms, filmExtraContainer, this._filmsModel, this._commentsModel,
          this._onDataChange, this._onViewChange, this._api);

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
      this._showingFilmsCount = this._showingFilmsCount + ShowingFilmsCount.BY_BUTTON;

      const showingFilms = this._filmsModel.getFilms()
        .slice(prevFilmsCount, this._showingFilmsCount);

      this._updateMainBoard(showingFilms);

      if (this._showingFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _updateMainBoard(films) {
    const newFilms = renderFilms(films, this._filmsListContainer, this._filmsModel, this._commentsModel,
        this._onDataChange, this._onViewChange, this._api);

    this._showedFilmControllers.main = this._showedFilmControllers.main.concat(newFilms);
  }

  _callControllers(cb) {
    this._filmControllerTypes.forEach((controllerType) => {
      this._showedFilmControllers[controllerType].forEach(cb);
    });
  }

  _updateAllControllers(oldData, newData) {
    this._callControllers((filmController) => {
      if (filmController.getFilm().id === oldData.id) {
        filmController.render(newData);
      }
    });
  }

  _onSortTypeChange() {
    this._updateMainFilms();
  }

  _onFilterChange() {
    this._updateMainFilms();
  }

  _onViewChange() {
    this._callControllers((filmController) => filmController.setDefaultView());
  }
}
