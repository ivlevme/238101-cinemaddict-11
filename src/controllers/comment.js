import {render, remove, replace} from "../utils/render.js";

import {DeleteButtonText, ElementStatus} from "../const.js";

import CommentComponent from "../components/comment.js";


export default class CommentController {
  constructor(container, comment, onCommentDataChange) {
    this._container = container;

    this._commentComponent = null;

    this._comment = comment;

    this._deleteButtonText = DeleteButtonText.DEFAULT;

    this._onCommentDataChange = onCommentDataChange;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  render() {
    const oldCommentComponent = this._commentComponent;
    this._commentComponent = new CommentComponent(this._comment, this._deleteButtonText);
    this._commentComponent.setDeleteButtonClickHandler(this._onDeleteButtonClick);

    if (oldCommentComponent) {
      replace(this._commentComponent, oldCommentComponent);
      return;
    }

    render(this._container, this._commentComponent);
  }

  destroy() {
    remove(this._commentComponent);
  }

  disableDeleteButton(status) {
    this._commentComponent.getElement().querySelector(`.film-details__comment-delete`).disabled = status;
  }

  getComment() {
    return this._comment;
  }

  getElement() {
    return this._commentComponent.getElement();
  }

  _onDeleteButtonClick() {
    this.setDeleteButtonText(DeleteButtonText.DELETING);
    this.render();

    this.disableDeleteButton(ElementStatus.DISABLE);

    this._onCommentDataChange(this._comment, null);
  }

  setDeleteButtonText(deleteButtonText) {
    this._deleteButtonText = deleteButtonText;
  }
}
