import {formatRuntime} from '../util.js';


const formatDescription = (description) => {
  if (description.length > 140) {
    description = `${description.slice(0, 139)}...`;
    return description;
  }

  return description;
};

const createFilmCardTemplate = (film) => {
  const {name, rating, releaseDate, runtime, genres, poster, description, comments} = film;

  return (`
    <article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate.getFullYear()}</span>
        <span class="film-card__duration">${formatRuntime(runtime)}</span>
        <span class="film-card__genre">${genres[genres.length - 1]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${name}" class="film-card__poster">
      <p class="film-card__description">${formatDescription(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>
  `);
};

const createFilmsCardTemplate = (films) => {
  return films
  .map((film) => createFilmCardTemplate(film))
  .join(`\n`);
};

export {createFilmCardTemplate, createFilmsCardTemplate};
