import {createProfileTemplate} from "./components/profile.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createExtraFilmsTemplate} from "./components/film-extra.js";
import {createDetailsPopupTemplate} from "./components/details-popup.js";
import {generateFilms, filters} from "./mock/film.js";
import {getRandomIntegerNumber} from "./util.js";
import {generateProfile} from "./mock/profile.js";


const FILMS_COUNT = 18;
const FILMS_EXTRA_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const FilmsCategory = [`Top rated`, `Most commented`];


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};


const films = generateFilms(FILMS_COUNT);
const profile = generateProfile();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfileTemplate(profile));
render(siteMainElement, createSiteMenuTemplate(filters));

const filmsElement = siteMainElement.querySelector(`.films`);

FilmsCategory.forEach((category) => {
  return render(filmsElement, createExtraFilmsTemplate(category));
});

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
const filmsExtraListContainerElements = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

films.slice(0, showingFilmsCount)
  .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film)));

render(filmsListElement, createShowMoreButtonTemplate());

const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film)));

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});

filmsExtraListContainerElements.forEach((filmsExtraListContainerElement) => {
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(filmsExtraListContainerElement, createFilmCardTemplate(films[getRandomIntegerNumber(0, films.length)]));
  }
});

render(document.body, createDetailsPopupTemplate(films[0]));
