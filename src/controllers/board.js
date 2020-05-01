import {Film, Sort, FILMS_EXTRA_COUNT} from "../const.js";
import {render, remove} from "../utils/render.js";

import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmExtraComponent from "../components/film-extra.js";

import FilmController from "./film.js";


const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;


const renderFilms = (arrayFilms, container, startIndexFilm, endIndexFilm, onDataChange, onViewChange) => {
  return arrayFilms.slice(startIndexFilm, endIndexFilm)
    .map((film) => {
      const filmController = new FilmController(container, onDataChange, onViewChange);
      filmController.render(film);

      return filmController;
    });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case Sort.TYPE.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case Sort.TYPE.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case Sort.TYPE.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};


export default class BoardFilmsController {
  constructor(container, sortComponent, pageController) {
    this._container = container;
    this._containerElement = this._container.getElement();
    this._buttonContainer = this._containerElement.querySelector(`.films-list`);
    this._filmsListContainer = this._containerElement.querySelector(`.films-list__container`);

    this._films = [];
    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = sortComponent;
    this._pageController = pageController;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;

    if (this._films.length) {
      this._renderMainFilms();
      this._renderExtraFilms();
    }
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    this._showedFilmControllers.forEach((filmController) => {
      if (filmController.getFilm() === oldData) {
        filmController.render(this._films[index]);
      }
    });

    this._pageController.renderFilters(this._films);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((filmController) => filmController.setDefaultView());
  }

  _renderMainFilms() {
    const sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType(), 0,
        this._showingFilmsCount);
    this._updateBoard(sortedFilms, this._filmsListContainer, this._showingFilmsCount);

    this._renderShowMoreButton();
  }

  _renderExtraFilms() {
    Film.CATEGORY.forEach((category) => {
      const filmExtraComponent = new FilmExtraComponent(this._films, category);
      const filmExtraElement = filmExtraComponent.getElement();

      if (filmExtraElement) {
        const filmExtraContainer = filmExtraElement.querySelector(`.films-list__container`);
        const filmsExtra = filmExtraComponent.getFilms();

        this._updateBoard(filmsExtra, filmExtraContainer, FILMS_EXTRA_COUNT);

        render(this._containerElement, filmExtraComponent);
      }
    });
  }

  _renderShowMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    remove(this._showMoreButtonComponent);
    render(this._buttonContainer, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType(),
          prevFilmsCount, this._showingFilmsCount);
      this._updateBoard(sortedFilms, this._filmsListContainer, this._showingFilmsCount);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange() {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;
    this._filmsListContainer.innerHTML = ``;

    const sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType(), 0,
        this._showingFilmsCount);
    this._updateBoard(sortedFilms, this._filmsListContainer, this._showingFilmsCount);

    this._renderShowMoreButton();
  }

  _updateBoard(films, container, showingFilmsCount) {
    const newFilms = renderFilms(films, container, 0, showingFilmsCount, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
  }
}
