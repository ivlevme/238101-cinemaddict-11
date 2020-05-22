import FilmModel from "./models/film.js";
import CommentModel from "./models/comment.js";

const getHeaders = (authorization) => {
  const headers = new Headers();
  headers.append(`Authorization`, authorization);

  return headers;
};

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getFilms() {
    const headers = getHeaders(this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((response) => response.json())
      .then(FilmModel.parseFilms);
  }

  getComments(id) {
    const headers = getHeaders(this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${id}`, {headers})
      .then((response) => response.json())
      .then(CommentModel.parseComments);
  }
}
