import {Film} from "./const.js";
import {createProfileTemplate} from "./components/profile.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createExtraFilmsTemplate} from "./components/film-extra.js";
import {createDetailsPopupTemplate} from "./components/details-popup.js";
import {createFilterTemplate} from "./components/filter.js";
import {generateFilms} from "./mock/film.js";
import {generateProfile} from "./mock/profile.js";


const FILMS_COUNT = 18;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const addFilmsToDOM = (startIndexFilm, endIndexFilm) => {
  films.slice(startIndexFilm, endIndexFilm)
    .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film)));
};

const films = generateFilms(FILMS_COUNT);

const profile = generateProfile();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfileTemplate(profile));
render(siteMainElement, createSiteMenuTemplate());

const mainNavigationItemsElement = siteMainElement.querySelector(`.main-navigation__items`);
render(mainNavigationItemsElement, createFilterTemplate(films));

const filmsElement = siteMainElement.querySelector(`.films`);

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

addFilmsToDOM(0, showingFilmsCount);

render(filmsListElement, createShowMoreButtonTemplate());

const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  addFilmsToDOM(prevFilmCount, showingFilmsCount);

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});


const sortedMostCommentedFilms = films.sort((a, b) => b.comments.length - a.comments.length).slice();
const sortedTopRatedFilms = films.sort((a, b) => b.rating - a.rating).slice();

Film.CATEGORY.forEach((category) => {
  let filmExtraTemplate = null;

  switch (category) {
    case Film.CATEGORY[Film.CATEGORY_INDEX.topRated]:
      filmExtraTemplate = createExtraFilmsTemplate(category, sortedTopRatedFilms);
      break;

    case Film.CATEGORY[Film.CATEGORY_INDEX.mostCommented]:
      filmExtraTemplate = createExtraFilmsTemplate(category, sortedMostCommentedFilms);
      break;
  }

  return render(filmsElement, filmExtraTemplate);
});


render(document.body, createDetailsPopupTemplate(films[0]));
