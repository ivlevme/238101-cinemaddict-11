import {render, replace, remove} from "../utils/render.js";

import DetailsPopupComponent from "../components/details-popup";
import FilmCardComponent from "../components/film-card.js";


export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._film = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._detailsPopupComponent = null;
    this._filmCardComponent = null;


    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._addDetailsPopup = this._addDetailsPopup.bind(this);
    this._removeDetailsPopup = this._removeDetailsPopup.bind(this);
    this._onWatchlistButtonClick = this._onWatchlistButtonClick.bind(this);
    this._onWatchedButtonClick = this._onWatchedButtonClick.bind(this);
    this._onFavoriteButtonClick = this._onFavoriteButtonClick.bind(this);
    this._setFilmCardListeners = this._setFilmCardListeners.bind(this);
    this.setDetailsPopupListeners = this.setDetailsPopupListeners.bind(this);
  }

  render(film) {
    this._film = film;

    const oldDetailsPopupComponent = this._detailsPopupComponent;
    const oldFilmCardComponent = this._filmCardComponent;

    this._detailsPopupComponent = new DetailsPopupComponent(film, this);
    this._filmCardComponent = new FilmCardComponent(film);

    this._setFilmCardListeners();

    if (oldDetailsPopupComponent && oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._detailsPopupComponent, oldDetailsPopupComponent);

      this.setDetailsPopupListeners(this._detailsPopupComponent);
      return;
    }

    render(this._container, this._filmCardComponent);
  }

  getFilm() {
    return this._film;
  }

  setDefaultView() {
    this._removeDetailsPopup();
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removeDetailsPopup();
    }
  }

  _addDetailsPopup() {
    render(document.body, this._detailsPopupComponent);

    this.setDetailsPopupListeners(this._detailsPopupComponent);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _removeDetailsPopup() {
    remove(this._detailsPopupComponent);

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onWatchlistButtonClick(evt) {
    evt.preventDefault();

    this._onDataChange(this._film, Object.assign({}, this._film, {
      isWatchlist: !this._film.isWatchlist
    }));
  }

  _onWatchedButtonClick(evt) {
    evt.preventDefault();

    this._onDataChange(this._film, Object.assign({}, this._film, {
      isWatched: !this._film.isWatched
    }));
  }

  _onFavoriteButtonClick(evt) {
    evt.preventDefault();

    this._onDataChange(this._film, Object.assign({}, this._film, {
      isFavorites: !this._film.isFavorites
    }));
  }

  _setFilmCardListeners() {
    this._filmCardComponent.setCoverClickHandler(this._addDetailsPopup);
    this._filmCardComponent.setTitleClickHandler(this._addDetailsPopup);
    this._filmCardComponent.setCommentsClickHandler(this._addDetailsPopup);

    this._filmCardComponent.setWatchlistButtonClickHandler(this._onWatchlistButtonClick);
    this._filmCardComponent.setWatchedButtonClickHandler(this._onWatchedButtonClick);
    this._filmCardComponent.setFavoriteButtonClickHandler(this._onFavoriteButtonClick);
  }

  setDetailsPopupListeners(detailsPopupComponent) {
    detailsPopupComponent.setClosePopupClickHandler(this._removeDetailsPopup);

    detailsPopupComponent.setWatchlistButtonClickHandler(this._onWatchlistButtonClick);
    detailsPopupComponent.setWatchedButtonClickHandler(this._onWatchedButtonClick);
    detailsPopupComponent.setFavoriteButtonClickHandler(this._onFavoriteButtonClick);

    detailsPopupComponent.setNewCommentClickHandler();
  }
}
