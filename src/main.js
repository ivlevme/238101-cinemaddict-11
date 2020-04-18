import {Film, IndexMap, FILMS_EXTRA_COUNT} from "./const.js";
import {render} from "./util.js";
import {countFilterCaterories} from "./filter-state.js";
import {generateFilms} from "./mock/film.js";
import {generateProfile} from "./mock/profile.js";
import ProfileComponent from "./components/profile.js";
import MainNavigationComponent from "./components/main-navigation.js";
import SortComponent from "./components/sort.js";
import FilmCardComponent from "./components/film-card.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import FilmExtraComponent from "./components/film-extra.js";
import DetailsPopupComponent from "./components/details-popup.js";
import FilterComponent from "./components/filter.js";
import FilmsContainerComponent from "./components/films-container.js";


const FILMS_COUNT = 18;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;


const addFilmsToDOM = (arrayFilms, container, startIndexFilm, endIndexFilm) => {
  arrayFilms.slice(startIndexFilm, endIndexFilm)
    .forEach((film) => {

      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

        if (isEscKey) {
          removeDetailsPopup();
        }
      };

      const addDetailsPopup = () => {
        document.body.appendChild(detailsPopupComponentElement);
        document.addEventListener(`keydown`, onEscKeyDown);
      };

      const removeDetailsPopup = () => {
        document.body.removeChild(detailsPopupComponentElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      };


      const onClosePopupClick = () => {
        removeDetailsPopup();
      };

      const onCoverClick = () => {
        addDetailsPopup();
      };

      const onTitleClick = () => {
        addDetailsPopup();
      };

      const onCommentsClick = () => {
        addDetailsPopup();
      };


      const detailsPopupComponent = new DetailsPopupComponent(film);
      const detailsPopupComponentElement = detailsPopupComponent.getElement();

      const closePopup = detailsPopupComponentElement.querySelector(`.film-details__close-btn`);
      closePopup.addEventListener(`click`, onClosePopupClick);


      const filmCardComponent = new FilmCardComponent(film);
      const filmCardComponentElement = filmCardComponent.getElement();

      const cover = filmCardComponentElement.querySelector(`img`);
      cover.addEventListener(`click`, onCoverClick);

      const title = filmCardComponentElement.querySelector(`.film-card__title`);
      title.addEventListener(`click`, onTitleClick);

      const comments = filmCardComponentElement.querySelector(`.film-card__comments`);
      comments.addEventListener(`click`, onCommentsClick);

      render(container, filmCardComponentElement);
    });
};

const renderFilters = () => {
  const currentFilterCategoriesState = countFilterCaterories(films);

  for (const filterCategoryState of currentFilterCategoriesState) {
    const name = filterCategoryState[IndexMap.KEY];
    const value = filterCategoryState[IndexMap.VALUE];

    render(mainNavigationComponentElement.querySelector(`.main-navigation__items`),
        new FilterComponent(name, value).getElement());
  }
};

const renderSortAndMenu = () => {
  renderFilters();

  render(siteMainElement, mainNavigationComponentElement);
  render(siteMainElement, new SortComponent().getElement());
};

const renderMainFilms = () => {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  addFilmsToDOM(films, filmsListContainerElement, 0, showingFilmsCount);

  render(filmsListElement, new ShowMoreButtonComponent().getElement());

  const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, () => {
    const prevFilmCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    addFilmsToDOM(films, filmsListContainerElement, prevFilmCount, showingFilmsCount);

    if (showingFilmsCount >= films.length) {
      loadMoreButton.remove();
    }
  });
};

const renderExtraFilms = () => {
  let filmExtraComponent = null;
  let filmExtraTemplate = null;

  const renderFilmExtraTemplate = (category, films) => {
    filmExtraComponent = new FilmExtraComponent(category, films);
    filmExtraTemplate = filmExtraComponent.getElement();
  };

  const sortedMostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length);
  const sortedTopRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);

  Film.CATEGORY.forEach((category) => {

    switch (category) {
      case Film.CATEGORY[Film.CATEGORY_INDEX.topRated]:
        renderFilmExtraTemplate(category, sortedTopRatedFilms);
        break;

      case Film.CATEGORY[Film.CATEGORY_INDEX.mostCommented]:
        renderFilmExtraTemplate(category, sortedMostCommentedFilms);
        break;
    }

    if (filmExtraComponent.getCurrentFilms()) {
      addFilmsToDOM(filmExtraComponent.getCurrentFilms(),
          filmExtraTemplate.querySelector(`.films-list__container`), 0, FILMS_EXTRA_COUNT);
    }

    render(filmCardComponentElement, filmExtraTemplate);
  });
};


const films = generateFilms(FILMS_COUNT);
const profile = generateProfile();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileComponent(profile).getElement());

const mainNavigationComponent = new MainNavigationComponent();
const mainNavigationComponentElement = mainNavigationComponent.getElement();

const filmCardComponent = new FilmsContainerComponent();
const filmCardComponentElement = filmCardComponent.getElement();

const filmsListElement = filmCardComponentElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

renderSortAndMenu();
renderMainFilms();
renderExtraFilms();

render(siteMainElement, filmCardComponentElement);
