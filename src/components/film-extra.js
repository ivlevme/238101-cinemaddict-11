import AbstractComponent from "./abstract-component.js";
import {Category, FILMS_EXTRA_COUNT} from "../const.js";


const getCurrentFilms = (films, category) => {
  switch (category) {
    case Category.TOP_RATED:
      const sortedTopRatedFilms = films.slice()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, FILMS_EXTRA_COUNT);
      return sortedTopRatedFilms.filter((film) => film.rating > 0);

    case Category.MOST_COMMENTED:
      const sortedMostCommentedFilms = films.slice()
        .sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, FILMS_EXTRA_COUNT);
      return sortedMostCommentedFilms.filter((film) => film.comments.length > 0);
  }

  return false;
};

const createExtraFilmsTemlpate = (films, category) => {
  return (
    films.length ?
      `
      <section class="films-list--extra">
        <h2 class="films-list__title">${category}</h2>

        <div class="films-list__container">
        </div>
      </section>`
      : ``).trim();
};


export default class FilmExtra extends AbstractComponent {
  constructor(films, category) {
    super();

    this._category = category;
    this._films = films;

    this._currentFilms = null;
  }

  getTemplate() {
    this._currentFilms = getCurrentFilms(this._films, this._category);

    return createExtraFilmsTemlpate(this._currentFilms, this._category);
  }

  getFilms() {
    return this._currentFilms;
  }
}
