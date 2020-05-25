import FilmModel from "../models/film.js";

import {isOnline} from "../utils/common.js";

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map((film) => film.toRAW()));

          this._store.setItems(items);

          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(FilmModel.parseFilms(storeFilms));
  }

  getComments(id) {
    return this._api.getComments(id);
  }

  updateFilm(id, film) {
    if (isOnline()) {
      return this._api.updateFilm(id, film)
      .then((newFilm) => {
        this._store.setItem(newFilm.id, newFilm.toRAW());

        return newFilm;
      });
    }

    const localFilm = FilmModel.clone(Object.assign(film, {id}));

    this._store.setItem(id, localFilm.toRAW());

    return Promise.resolve(localFilm);
  }

  createComment(comment, filmId) {
    return this._api.createComment(comment, filmId);
  }

  removeComment(id) {
    return this._api.removeComment(id);
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const updatedFilms = response.updated;

          this._store.setItems(updatedFilms);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
