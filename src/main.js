import {createProfileTemplate} from "./components/profile.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createTopRatedFilmsTemplate} from "./components/top-rated-films.js";
import {createMostCommentedFilmsTemplate} from "./components/most-commented-films.js";
import {createDetailsPopupTemplate} from "./components/details-popup.js";


const FILMS_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createSiteMenuTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);

render(filmsElement, createTopRatedFilmsTemplate());
render(filmsElement, createMostCommentedFilmsTemplate());

const filmsListElement = filmsElement.querySelector(`.films-list .films-list__container`);
const filmsExtraListElements = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListElement, createFilmCardTemplate());
}

render(filmsListElement, createShowMoreButtonTemplate());

filmsExtraListElements.forEach((filmsExtraListElement) => {
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(filmsExtraListElement, createFilmCardTemplate());
  }
});

render(document.body, createDetailsPopupTemplate());
