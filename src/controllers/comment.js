import {render, remove} from "../utils/render.js";

import CommentComponent from "../components/comment.js";


export default class CommentController {
  constructor(container, onCommentDataChange) {
    this._container = container;

    this._commentComponent = null;

    this._comment = null;

    this._onCommentDataChange = onCommentDataChange;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  render(comment) {
    this._comment = comment;

    this._commentComponent = new CommentComponent(comment);
    this._commentComponent.setDeleteButtonClickHandler(this._onDeleteButtonClick);

    render(this._container, this._commentComponent);
  }

  destroy() {
    remove(this._commentComponent);
  }

  _onDeleteButtonClick() {
    this._onCommentDataChange(this._comment, null);
  }
}
