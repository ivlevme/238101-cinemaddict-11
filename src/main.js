import {IndexMap} from "./const.js";
import {render} from "./utils/render.js";
import {countFilterCaterories} from "./filter-state.js";

import {generateFilms} from "./mock/film.js";
import {generateProfile} from "./mock/profile.js";

import ProfileComponent from "./components/profile.js";
import MainNavigationComponent from "./components/main-navigation.js";
import SortComponent from "./components/sort.js";
import FilterComponent from "./components/filter.js";
import FilmsContainerComponent from "./components/films-container.js";
import NoFilmsComponent from "./components/no-films.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";

import BoardFilmsController from "./controllers/board-films.js";


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

const renderBoardFilms = () => {
  if (films.length > 0) {
    const filmsContainerComponent = new FilmsContainerComponent();
    render(siteMainElement, filmsContainerComponent);

    const filmsController = new BoardFilmsController(filmsContainerComponent, sortComponent);
    filmsController.render(films);
    return;
  }

  render(siteMainElement, new NoFilmsComponent());
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

const sortComponent = new SortComponent();

renderFilters();
render(siteMainElement, mainNavigationComponent);
render(siteMainElement, sortComponent);
renderBoardFilms();
renderFooterStatistics();
