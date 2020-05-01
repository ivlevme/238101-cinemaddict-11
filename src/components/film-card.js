import AbstractComponent from "./abstract-component.js";
import {formatRuntime} from '../utils/common.js';


const ControlModifier = {
  watchlist: `add-to-watchlist`,
  watched: `mark-as-watched`,
  favorite: `favorite`,
};

const ControlName = {
  watchlist: `Add to watchlist`,
  watched: `Mark as watched`,
  favorite: `Mark as favorite`,
};


const formatDescription = (description) => {
  if (description.length > 140) {
    description = `${description.slice(0, 139)}...`;
    return description;
  }

  return description;
};

const createControlsMarkup = (type, isAcitve) => {
  return (`
    <button class="film-card__controls-item button
      film-card__controls-item--${ControlModifier[type]}
      ${isAcitve ? `film-card__controls-item--active` : ``}">
        ${ControlName[type]}
    </button>
  `).trim();
};

const createFilmCardTemplate = (film) => {
  const {name, rating, releaseDate, runtime, genres, poster, description, comments,
    isWatchlist, isWatched, isFavorites} = film;

  const watchlistButton = createControlsMarkup(`watchlist`, isWatchlist);
  const watchedButton = createControlsMarkup(`watched`, isWatched);
  const favoriteButton = createControlsMarkup(`favorite`, isFavorites);

  return (`
    <article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate.getFullYear()}</span>
        <span class="film-card__duration">${formatRuntime(runtime)}</span>
        <span class="film-card__genre">${genres[genres.length - 1]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${name}" class="film-card__poster">
      <p class="film-card__description">${formatDescription(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        ${watchlistButton}
        ${watchedButton}
        ${favoriteButton}
      </form>
    </article>
  `).trim();
};


export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
    this._filmCardControlsElement = this.getElement().querySelector(`.film-card__controls`);

    this._coverClickHandler = null;
    this._titleClickHandler = null;
    this._commentsClickHandler = null;

    this._watchlistButtonClickHandler = null;
    this._watchedButtonClickHandler = null;
    this._favoriteButtonClickHandler = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setCoverClickHandler(handler) {
    this.getElement().querySelector(`img`)
      .addEventListener(`click`, handler);

    this._coverClickHandler = handler;
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);

    this._titleClickHandler = handler;
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);

    this._commentsClickHandler = handler;
  }

  setWatchlistButtonClickHandler(handler) {
    this._filmCardControlsElement.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);

    this._watchlistButtonClickHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this._filmCardControlsElement.querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);

    this._watchedButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this._filmCardControlsElement.querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);

    this._favoriteButtonClickHandler = handler;
  }
}
