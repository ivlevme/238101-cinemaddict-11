import {generateFilms} from "./mock/film.js";
import {generateProfile} from "./mock/profile.js";

import PageController from "./controllers/page.js";

import FilmsModel from "./models/films.js";


const FILMS_COUNT = 13;


const films = generateFilms(FILMS_COUNT);
const profile = generateProfile();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const pageController = new PageController(siteHeaderElement, siteMainElement, siteFooterElement, filmsModel);
pageController.render(profile);
