import {IndexMap, FILMS_EMPTY} from "./const.js";
import {render} from "./utils/render.js";
import {countFilterCaterories} from "./filter-state.js";

import {generateFilms} from "./mock/film.js";
import {generateProfile} from "./mock/profile.js";

import ProfileComponent from "./components/profile.js";
import MainNavigationComponent from "./components/main-navigation.js";
import SortComponent from "./components/sort.js";
import FilterComponent from "./components/filter.js";
import FilmsContainerComponent from "./components/films-container.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";

import FilmsController from "./controllers/films.js";


const FILMS_COUNT = 18;


const renderFilters = () => {
  const currentFilterCategoriesState = countFilterCaterories(films);

  for (const filterCategoryState of currentFilterCategoriesState) {
    const name = filterCategoryState[IndexMap.KEY];
    const value = filterCategoryState[IndexMap.VALUE];

    render(mainNavigationContainer.querySelector(`.main-navigation__items`),
        new FilterComponent(name, value));
  }
};

const renderSortAndMenu = () => {
  renderFilters();

  render(siteMainElement, mainNavigationComponent);
  render(siteMainElement, new SortComponent());
};

const renderFooterStatistics = () => {
  const footer = document.body.querySelector(`.footer`);
  const footerStatistics = footer.querySelector(`.footer__statistics`);

  const footerStatisticsComponent = new FooterStatisticsComponent(films.length);

  render(footerStatistics, footerStatisticsComponent);
};


const films = generateFilms(FILMS_COUNT);
const profile = generateProfile();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileComponent(profile));

const mainNavigationComponent = new MainNavigationComponent();
const mainNavigationContainer = mainNavigationComponent.getElement();

const isFilmsEmpty = films.length > FILMS_EMPTY ? false : true;

const filmsContainerComponent = new FilmsContainerComponent(isFilmsEmpty);
const filmsController = new FilmsController(filmsContainerComponent);


renderSortAndMenu();

render(siteMainElement, filmsContainerComponent);
filmsController.render(films);

renderFooterStatistics();
