import {getArrayNonrepeatingItems} from "../util.js";
import {Film} from "../const.js";
import {createFilmsCardTemplate} from "../components/film-card.js";


const FILMS_EXTRA_COUNT = 2;

const INDEX_FIRST_ELEMENT = 0;

const MIN_RATING = 0;
const MIN_COUNT_COMMENTS = 0;


const selectMostCommentedFilms = (films) => {
  const mostCommentedValue = films[INDEX_FIRST_ELEMENT].comments.length;

  if (mostCommentedValue === MIN_RATING) {
    return false;
  }

  let mostCommentedFilms = [];

  let indexLastRepeatMaxValue = -1;

  for (const film of films) {
    if (film.comments.length !== mostCommentedValue) {
      break;
    }

    indexLastRepeatMaxValue++;
  }

  return selectFilms(films, indexLastRepeatMaxValue, mostCommentedFilms);
};

const selectTopRatedFilms = (films) => {
  const topRatedValue = films[INDEX_FIRST_ELEMENT].rating;

  if (topRatedValue === MIN_COUNT_COMMENTS) {
    return false;
  }

  let topRatedFilms = [];

  let indexLastRepeatMaxValue = -1;

  for (const film of films) {
    if (film.rating !== topRatedValue) {
      break;
    }

    indexLastRepeatMaxValue++;
  }

  return selectFilms(films, indexLastRepeatMaxValue, topRatedFilms);
};

const selectFilms = (allFilms, indexLastRepeatFilm, currentFilms) => {
  const countRepeatMaxValue = indexLastRepeatFilm + 1;

  if (countRepeatMaxValue > FILMS_EXTRA_COUNT) {
    currentFilms = getArrayNonrepeatingItems(allFilms.splice(INDEX_FIRST_ELEMENT, countRepeatMaxValue), FILMS_EXTRA_COUNT);
    return currentFilms;
  }

  currentFilms = allFilms.splice(INDEX_FIRST_ELEMENT, FILMS_EXTRA_COUNT);
  return currentFilms;
};

const createExtraFilmsTemplate = (category, films) => {
  let currentCategoryfilms = [];

  switch (category) {
    case Film.CATEGORY[Film.CATEGORY_INDEX.topRated]:
      currentCategoryfilms = selectTopRatedFilms(films);
      break;

    case Film.CATEGORY[Film.CATEGORY_INDEX.mostCommented]:
      currentCategoryfilms = selectMostCommentedFilms(films);
      break;
  }


  return (
    currentCategoryfilms === false ? `` :
      `
      <section class="films-list--extra">
        <h2 class="films-list__title">${category}</h2>

        <div class="films-list__container">
        ${createFilmsCardTemplate(currentCategoryfilms)}
        </div>
      </section>
  `);
};


export {createExtraFilmsTemplate};
