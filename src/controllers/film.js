import {EMPTY_ARRAY_LENGTH, INDEX_FIRST_ELEMENT_IN_ARRAY, INDEX_NEXT_ELEMENT_IN_ARRAY, INDEX_MISS_ELEMENT,
  DeleteButtonText, ElementStatus, Color, KeyboardKey} from "../const.js";

import {render, replace, remove} from "../utils/render.js";
import {shake, isOnline} from "../utils/common.js";

import DetailsPopupComponent from "../components/details-popup";
import FilmCardComponent from "../components/film-card.js";
import CommentsErrorComponent from "../components/comments-error.js";
import CommentsLoadingComponent from "../components/comments-loading.js";

import CommentController from "./comment.js";

import FilmModel from "../models/film.js";
import CommentModel from "../models/comment.js";


export default class FilmController {
  constructor(container, filmsModel, commentsModel, onDataChange, onViewChange, api) {
    this._container = container;

    this._film = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._api = api;

    this._detailsPopupComponent = null;
    this._filmCardComponent = null;
    this._commentsContainer = null;

    this._commentControllers = [];

    this._filmsModel = filmsModel;
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

  getDetailsPopupComponent() {
    return this._detailsPopupComponent.getElement();
  }

  getFilmCardComponent() {
    return this._filmCardComponent.getElement();
  }

  enableMainForm() {
    this._detailsPopupComponent.manageFilmControlForm(ElementStatus.ENABLE);
    this.enableCommentsForm(ElementStatus.ENABLE);
  }

  disableMainForm() {
    this._detailsPopupComponent.manageFilmControlForm(ElementStatus.DISABLE);
    this.disableCommentsForm(ElementStatus.DISABLE);
  }

  enableCommentsForm() {
    this._detailsPopupComponent.manageCommentsForm(ElementStatus.ENABLE);
  }

  disableCommentsForm() {
    this._detailsPopupComponent.manageCommentsForm(ElementStatus.DISABLE);
  }

  _renderDetailsPopupComponent() {
    this._detailsPopupComponent = new DetailsPopupComponent(this._film, this._displayComments);

    this._displayComments();
    this._setDetailsPopupListeners();

    if (!isOnline()) {
      render(this._commentsContainer, this._commentsErrorComponent);

      this.disableCommentsForm();
    }
  }

  _displayComments() {
    this._commentControllers.forEach((commentController) => commentController.destroy());

    this._commentsContainer = this._detailsPopupComponent.getElement()
      .querySelector(`.film-details__comments-list`);

    const comments = this._renderComments(this._commentsContainer);

    if (!comments.length > EMPTY_ARRAY_LENGTH && this._film.comments.length > EMPTY_ARRAY_LENGTH && isOnline()) {
      render(this._commentsContainer, this._commentsLoadingComponent);
      return;
    }

    remove(this._commentsLoadingComponent);

    this._commentControllers = [];
    this._commentControllers = this._commentControllers.concat(comments);
  }

  _renderComments(container) {
    return Array.from(this._commentsModel.getComments(this._film.comments, this._film.id))
    .map((comment) => {
      const commentController = new CommentController(container, comment, this._onCommentDataChange);
      commentController.render();

      return commentController;
    });
  }

  _addComment(newData) {
    const newComment = CommentModel.parseComment(newData);

    this._api.createComment(newComment, this._film.id)
      .then((models) => {
        const {filmModel, commentModel} = models;

        const isSuccessAddComment = this._commentsModel.setComments(commentModel, this._film.id);
        const isSuccessAddFilm = this._filmsModel.updateFilm(filmModel, this._film.id);

        if (isSuccessAddFilm && isSuccessAddComment) {
          this._onDataChange(this._film, filmModel);

          this.enableMainForm();
          return;
        }

        throw new Error();
      })
      .catch(() => {
        this.enableMainForm();
        this._detailsPopupComponent.addNewCommentBorderColor(Color.RED);
        shake(this._detailsPopupComponent.getElement().querySelector(`.film-details__new-comment`));
      });
  }

  _removeComment(oldData) {
    this._api.removeComment(oldData.id)
      .then(() => {
        const isSuccess = this._commentsModel.removeComment(oldData.id, this._film.id);

        if (isSuccess) {
          const indexId = this._film.comments.findIndex((commentId) => commentId === oldData.id);

          if (indexId === INDEX_MISS_ELEMENT) {
            return;
          }

          const newFilm = FilmModel.clone(this._film);
          newFilm.comments = [].concat(
              newFilm.comments.slice(INDEX_FIRST_ELEMENT_IN_ARRAY, indexId),
              newFilm.comments.slice(indexId + INDEX_NEXT_ELEMENT_IN_ARRAY)
          );

          this._onDataChange(this._film, newFilm);
        }
      })
      .catch(() => {
        this._commentControllers.forEach((commentController) => {
          if (commentController.getComment().id === oldData.id) {
            commentController.setDeleteButtonText(DeleteButtonText.DEFAULT);
            commentController.render();
            commentController.disableDeleteButton(ElementStatus.ENABLE);

            shake(commentController.getElement());
          }
        });
      });
  }

  _addDetailsPopup() {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(comments, this._film.id);
        this._displayComments();
      })
      .catch(() => {
        remove(this._commentsLoadingComponent);

        this._commentControllers.forEach((commentController) => commentController.destroy());

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

  _checkFields(comment) {
    if (comment.comment !== `` && comment.emotion !== null) {
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

  _onCommentDataChange(oldData, newData) {
    if (oldData === null) {
      this._addComment(newData);
      return;
    }

    this._removeComment(oldData);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === KeyboardKey.ESCAPE || evt.key === KeyboardKey.ESC;

    if (isEscKey) {
      this._removeDetailsPopup();
    }
  }

  _onWatchlistButtonClick(evt) {
    evt.preventDefault();

    const newFilm = FilmModel.clone(this._film);
    newFilm.isWatchlist = !newFilm.isWatchlist;

    this._onDataChange(this._film, newFilm);
  }

  _onWatchedButtonClick(evt) {
    evt.preventDefault();

    const newFilm = FilmModel.clone(this._film);
    newFilm.isWatched = !newFilm.isWatched;
    newFilm.watchingDate = new Date();

    this._onDataChange(this._film, newFilm);
  }

  _onFavoriteButtonClick(evt) {
    evt.preventDefault();

    const newFilm = FilmModel.clone(this._film);
    newFilm.isFavorites = !newFilm.isFavorites;

    this._onDataChange(this._film, newFilm);
  }

  _onSubmit(evt) {
    const isCtrlEnterKeyPress = (evt.ctrlKey || evt.metaKey) && evt.key === KeyboardKey.ENTER;

    if (isCtrlEnterKeyPress) {
      const newComment = this._detailsPopupComponent.getNewComment();
      if (this._checkFields(newComment)) {
        this._detailsPopupComponent.addNewCommentBorderColor(Color.NONE);
        this.disableMainForm();
        this._addComment(newComment);
        return;
      }

      this._detailsPopupComponent.addNewCommentBorderColor(Color.RED);
      shake(this._detailsPopupComponent.getElement().querySelector(`.film-details__new-comment`));
    }
  }
}
