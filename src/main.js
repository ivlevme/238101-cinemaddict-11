import API from "./api.js";

import PageController from "./controllers/page.js";


const AUTHORIZATION = `Basic lfkds7`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;


const api = new API(END_POINT, AUTHORIZATION);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);


const pageController = new PageController(siteHeaderElement, siteMainElement, siteFooterElement, api);
pageController.render();
