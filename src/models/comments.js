export default class Comments {
  constructor() {
    this._comments = [];

    this._dataChangeHandlers = [];
  }

  getComments(commentIds) {
    const comments = [];

    commentIds.forEach((commentId) => {
      const index = this._comments.findIndex((comment) => comment.id === commentId);

      if (index !== -1) {
        comments.push(this._comments[index]);
      }
    });

    return comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);

    this._callHandlers(this._dataChangeHandlers);
  }

  addComment(comment) {
    this._comments = [].concat(this._comments, comment);

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removeComment(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

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
