import {generateFilms} from "./mock/film.js";
import {generateProfile} from "./mock/profile.js";

import PageController from "./controllers/page.js";


const FILMS_COUNT = 13;


const films = generateFilms(FILMS_COUNT);
const profile = generateProfile();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const pageController = new PageController(siteHeaderElement, siteMainElement);
pageController.render(films, profile);
