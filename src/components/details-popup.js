import AbstractSmartComponent from "./abstract-smart-component.js";
import {MONTH_NAMES, Comment} from '../const.js';
import {castTimeFormat, formatRuntime} from '../utils/common.js';


const formatReleaseDate = (date) => {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
};

const formatCommentDate = (date) => {
  return `${date.getFullYear()}/${date.getDate()}/${date.getMonth()}
  ${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;
};

const createGenresMarkup = (genres) => {
  return genres
    .map((genre) => {
      return `<span class="film-details__genre">${genre}</span>`;
    })
    .join(`\n`);
};

const createCommentsMarkup = (comments) => {
  return comments
    .map((comment) => {
      const {emoji, text, author, date} = comment;
      return (`
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
          </span>
          <div>
            <p class="film-details__comment-text">${text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${formatCommentDate(date)}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
      `);
    });
};

const createSelectedEmojiMarkup = (selectedCommentEmoji) => {
  return (`
    <img src="images/emoji/${selectedCommentEmoji}.png" width="55" height="55" alt="emoji-${selectedCommentEmoji}">
  `);
};

const createNewCommentMarkup = (name, selectedCommentEmoji) => {
  return (`
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
      id="emoji-${name}" value="${name}" ${selectedCommentEmoji === name ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${name}">
      <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
    </label>
  `).trim();
};

const createNewCommentButtonsMarkup = (selectedCommentEmoji) => {
  const newCommentButtons = [];

  Comment.EMOJI.forEach((name) => {
    const newButtonMarkup = createNewCommentMarkup(name, selectedCommentEmoji);

    newCommentButtons.push(newButtonMarkup);
  });

  return newCommentButtons.join(`\n`);
};

const createDetailsPopupTemplate = (film, selectedCommentEmoji) => {
  const {poster, ageLimit, name, original, rating, director, writers, actors, releaseDate, runtime,
    country, genres, description, comments, isFavorites, isWatched, isWatchlist} = film;

  return (`
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

              <p class="film-details__age">${ageLimit}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">${original}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writer${writers.length > 1 ? `s` : ``}</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actor${actors.length > 1 ? `s` : ``}</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatReleaseDate(releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatRuntime(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genre${genres.length > 1 ? `s` : ``}</td>
                  <td class="film-details__cell">
                  ${createGenresMarkup(genres)}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist"
              name="watchlist" ${isWatchlist ? `checked` : ``}>
            <label for="watchlist"
              class="film-details__control-label film-details__control-label--watchlist">
                Add to watchlist
            </label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched"
              name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched"
              class="film-details__control-label film-details__control-label--watched">
                Already watched
            </label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite"
              name="favorite" ${isFavorites ? `checked` : ``}>
            <label for="favorite"
              class="film-details__control-label film-details__control-label--favorite">
                Add to favorites
            </label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${createCommentsMarkup(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${selectedCommentEmoji ? createSelectedEmojiMarkup(selectedCommentEmoji) : ``}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${createNewCommentButtonsMarkup(selectedCommentEmoji)}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>
  `).trim();
};


export default class DetailsPopup extends AbstractSmartComponent {
  constructor(film, filmController) {
    super();

    this._film = film;
    this._selectedCommentEmoji = null;

    this._filmController = filmController;

    this.setNewCommentClickHandler();
  }

  recoveryListeners() {
    this._filmController.setDetailsPopupListeners(this);
    this.setNewCommentClickHandler();
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createDetailsPopupTemplate(this._film, this._selectedCommentEmoji);
  }

  setClosePopupClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
  }

  setNewCommentClickHandler() {
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, (evt) => {

        if (evt.target.tagName !== `INPUT`) {
          return;
        }

        this._selectedCommentEmoji = evt.target.value;
        this.rerender();
      });
  }
}
