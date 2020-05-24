import API from "./api/index.js";
import Provider from "./api/provider.js";
import Store from "./api/store.js";

import PageController from "./controllers/page.js";

import {isOnline} from "./utils/common.js";
import {ElementStatus} from "./const.js";


const AUTHORIZATION = `Basic lfkds7`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;


const manageOfflineMode = (status) => {
  pageController.manageCommentsForm(status);

  if (status) {
    document.title += ` [offline]`;
    return;
  }

  document.title = document.title.replace(` [offline]`, ``);
};


const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);


const pageController = new PageController(siteHeaderElement, siteMainElement, siteFooterElement,
    apiWithProvider);
pageController.render();


window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  apiWithProvider.sync();
  manageOfflineMode(ElementStatus.ENABLE);
});

window.addEventListener(`offline`, () => {
  manageOfflineMode(ElementStatus.DISABLE);
});

window.addEventListener(`load`, () => {
  if (!isOnline()) {
    manageOfflineMode(ElementStatus.DISABLE);
  }
});
