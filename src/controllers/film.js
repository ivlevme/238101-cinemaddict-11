import {render, replace, remove} from "../utils/render.js";

import DetailsPopupComponent from "../components/details-popup";
import FilmCardComponent from "../components/film-card.js";
import CommentsErrorComponent from "../components/comments-error.js";
import CommentsLoadingComponent from "../components/comments-loading.js";

import CommentController from "./comment.js";

export default class FilmController {
  constructor(container, commentsModel, onDataChange, onViewChange, api) {
    this._container = container;

    this._film = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._api = api;

    this._detailsPopupComponent = null;
    this._filmCardComponent = null;
    this._commentsContainer = null;

    this._commentControllers = [];

    this._commentsModel = commentsModel;

    this._commentsErrorComponent = new CommentsErrorComponent();
    this._commentsLoadingComponent = new CommentsLoadingComponent();

    this._displayComments = this._displayComments.bind(this);

    this._onCommentDataChange = this._onCommentDataChange.bind(this);

    this._onSubmit = this._onSubmit.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._addDetailsPopup = this._addDetailsPopup.bind(this);
    this._removeDetailsPopup = this._removeDetailsPopup.bind(this);

    this._onWatchlistButtonClick = this._onWatchlistButtonClick.bind(this);
    this._onWatchedButtonClick = this._onWatchedButtonClick.bind(this);
    this._onFavoriteButtonClick = this._onFavoriteButtonClick.bind(this);

    this._setFilmCardListeners = this._setFilmCardListeners.bind(this);
    this._setDetailsPopupListeners = this._setDetailsPopupListeners.bind(this);
  }

  render(film) {
    this._film = film;

    const oldDetailsPopupComponent = this._detailsPopupComponent;
    const oldFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._setFilmCardListeners();
    this._renderDetailsPopupComponent();

    if (oldDetailsPopupComponent && oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._detailsPopupComponent, oldDetailsPopupComponent);
      return;
    }

    render(this._container, this._filmCardComponent);
  }

  _renderDetailsPopupComponent() {
    this._detailsPopupComponent = new DetailsPopupComponent(this._film, this._displayComments);

    this._displayComments();
    this._setDetailsPopupListeners();
  }

  _displayComments() {
    this._commentControllers.forEach((commentController) => commentController.destroy());

    this._commentsContainer = this._detailsPopupComponent.getElement()
      .querySelector(`.film-details__comments-list`);

    const comments = this._renderComments(this._commentsContainer);

    if (!comments.length > 0 && this._film.comments.length > 0) {
      render(this._commentsContainer, this._commentsLoadingComponent);
      return;
    }

    remove(this._commentsLoadingComponent);

    this._commentControllers = [];
    this._commentControllers = this._commentControllers.concat(comments);
  }

  getFilm() {
    return this._film;
  }

  setDefaultView() {
    this._removeDetailsPopup();
  }

  destroy() {
    remove(this._detailsPopupComponent);
    remove(this._filmCardComponent);

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _renderComments(container) {
    return Array.from(this._commentsModel.getComments(this._film.comments, this._film.id))
    .map((comment) => {
      const commentController = new CommentController(container, this._onCommentDataChange);
      commentController.render(comment);

      return commentController;
    });
  }

  _addComment(newData) {
    const isSuccess = this._commentsModel.addComment(newData, this._film.id);

    if (isSuccess) {
      const indexId = newData.id;

      const newFilm = Object.assign({}, this._film);

      newFilm.comments = [].concat(newFilm.comments, indexId);

      this._onDataChange(this._film, newFilm);
    }
  }

  _removeComment(oldData) {
    const isSuccess = this._commentsModel.removeComment(oldData.id, this._film.id);

    if (isSuccess) {
      const indexId = this._film.comments.findIndex((commentId) => commentId === oldData.id);

      if (indexId === -1) {
        return;
      }

      const newFilm = Object.assign({}, this._film);
      newFilm.comments = [].concat(newFilm.comments.slice(0, indexId), newFilm.comments.slice(indexId + 1));

      this._onDataChange(this._film, newFilm);
    }
  }

  _onCommentDataChange(oldData, newData) {
    if (oldData === null) {
      this._addComment(newData);
      return;
    }

    this._removeComment(oldData);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removeDetailsPopup();
    }
  }

  _addDetailsPopup() {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(comments, this._film.id);
        this._displayComments();
      })
      .catch(() => {
        remove(this._commentsLoadingComponent);
        render(this._commentsContainer, this._commentsErrorComponent);
      });

    this._onViewChange();

    render(document.body, this._detailsPopupComponent);

    document.addEventListener(`keydown`, this._onSubmit);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _removeDetailsPopup() {
    remove(this._detailsPopupComponent);
    this._renderDetailsPopupComponent();

    document.removeEventListener(`keydown`, this._onSubmit);
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

  _onSubmit(evt) {
    const isCtrlEnterKeyPress = evt.ctrlKey && evt.key === `Enter`;

    if (isCtrlEnterKeyPress) {
      const newComment = this._detailsPopupComponent.getNewComment();
      if (this._checkFields(newComment)) {
        this._addComment(newComment);
        return;
      }

      // TODO: Добавить эффект shake
    }
  }

  _checkFields(comment) {
    if (comment.text !== `` && comment.emoji !== null) {
      return true;
    }

    return false;
  }

  _setFilmCardListeners() {
    this._filmCardComponent.setCoverClickHandler(this._addDetailsPopup);
    this._filmCardComponent.setTitleClickHandler(this._addDetailsPopup);
    this._filmCardComponent.setCommentsClickHandler(this._addDetailsPopup);

    this._filmCardComponent.setWatchlistButtonClickHandler(this._onWatchlistButtonClick);
    this._filmCardComponent.setWatchedButtonClickHandler(this._onWatchedButtonClick);
    this._filmCardComponent.setFavoriteButtonClickHandler(this._onFavoriteButtonClick);
  }

  _setDetailsPopupListeners() {
    this._detailsPopupComponent.setClosePopupClickHandler(this._removeDetailsPopup);

    this._detailsPopupComponent.setWatchlistButtonClickHandler(this._onWatchlistButtonClick);
    this._detailsPopupComponent.setWatchedButtonClickHandler(this._onWatchedButtonClick);
    this._detailsPopupComponent.setFavoriteButtonClickHandler(this._onFavoriteButtonClick);
  }
}
