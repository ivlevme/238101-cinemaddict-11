import {INDEX_NEXT_ELEMENT_IN_ARRAY, INDEX_FIRST_ELEMENT_IN_ARRAY, INDEX_MISS_ELEMENT} from "../const";

export default class Comments {
  constructor() {
    this._comments = {};

    this._dataChangeHandlers = [];
  }

  getComments(commentIds, filmId) {
    const comments = [];

    if (!this._comments[filmId]) {
      return comments;
    }

    commentIds.forEach((commentId) => {
      const index = this._comments[filmId].findIndex((comment) => comment.id === commentId);

      if (index !== INDEX_MISS_ELEMENT) {
        comments.push(this._comments[filmId][index]);
      }
    });

    return comments;
  }

  setComments(comments, filmId) {
    this._comments[filmId] = Array.from(comments);

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addComment(comment, filmId) {
    this._comments[filmId] = [].concat(this._comments[filmId], comment);

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removeComment(id, filmId) {
    const index = this._comments[filmId].findIndex((comment) => comment.id === id);

    if (index === INDEX_MISS_ELEMENT) {
      return false;
    }

    this._comments[filmId] = [].concat(
        this._comments[filmId].slice(INDEX_FIRST_ELEMENT_IN_ARRAY, index),
        this._comments[filmId].slice(index + INDEX_NEXT_ELEMENT_IN_ARRAY)
    );

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
