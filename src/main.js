import {generateFilms} from "./mock/film.js";
import {generateComments} from "./mock/comment.js";

import PageController from "./controllers/page.js";

import FilmsModel from "./models/films.js";
import CommentsModel from "./models/comments.js";


const FILMS_COUNT = 2;
const COMMENTS_COUNT = 20;

const comments = generateComments(COMMENTS_COUNT);
const films = generateFilms(FILMS_COUNT, comments);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const pageController = new PageController(siteHeaderElement, siteMainElement, siteFooterElement,
    filmsModel, commentsModel);
pageController.render();
