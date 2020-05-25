import AbstractComponent from "./abstract-component.js";

import {formatCommentDate} from "../utils/common.js";


const createCommentTemplate = (comment, buttonText) => {
  const {emoji, text, author, date} = comment;

  const commentDate = formatCommentDate(date);

  return (`
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">${buttonText}</button>
        </p>
      </div>
    </li>
  `).trim();
};


export default class Comment extends AbstractComponent {
  constructor(comment, deleteButtonText) {
    super();

    this._comment = comment;
    this._buttonText = deleteButtonText;
  }

  getTemplate() {
    return createCommentTemplate(this._comment, this._buttonText);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        handler();
      });
  }
}
