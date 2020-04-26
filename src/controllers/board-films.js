import FilmCardComponent from "../components/film-card.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmExtraComponent from "../components/film-extra.js";
import DetailsPopupComponent from "../components/details-popup.js";
import {render, remove} from "../utils/render.js";
import {Film, SortType, FILMS_EXTRA_COUNT} from "../const.js";


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
        render(document.body, detailsPopupComponent);
        document.addEventListener(`keydown`, onEscKeyDown);
      };

      const removeDetailsPopup = () => {
        remove(detailsPopupComponent);
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
      detailsPopupComponent.setClosePopupClickHandler(onClosePopupClick);


      const filmCardComponent = new FilmCardComponent(film);
      filmCardComponent.setCoverClickHandler(onCoverClick);
      filmCardComponent.setTitleClickHandler(onTitleClick);
      filmCardComponent.setCommentsClickHandler(onCommentsClick);

      render(container, filmCardComponent);
    });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};


export default class BoardFilmsController {
  constructor(container, sortComponent) {
    this._container = container;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = sortComponent;
  }

  render(films) {
    const renderMainFilms = () => {
      const renderShowMoreButton = () => {
        if (showingFilmsCount >= films.length) {
          return;
        }

        render(buttonContainer, this._showMoreButtonComponent);

        this._showMoreButtonComponent.setClickHandler(() => {
          const prevFilmsCount = showingFilmsCount;
          showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

          const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(),
              prevFilmsCount, showingFilmsCount);

          addFilmsToDOM(sortedFilms, filmsListContainer, 0, showingFilmsCount);

          if (showingFilmsCount >= films.length) {
            remove(this._showMoreButtonComponent);
          }
        });
      };


      const filmsListContainer = container.querySelector(`.films-list__container`);
      const buttonContainer = container.querySelector(`.films-list`);

      let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

      addFilmsToDOM(films, filmsListContainer, 0, showingFilmsCount);
      renderShowMoreButton();

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;
        filmsListContainer.innerHTML = ``;

        const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);


        addFilmsToDOM(sortedFilms, filmsListContainer, 0, showingFilmsCount);
        renderShowMoreButton();
      });
    };

    const renderExtraFilms = () => {
      Film.CATEGORY.forEach((category) => {
        const filmExtraComponent = new FilmExtraComponent(films, category);
        const filmExtraElement = filmExtraComponent.getElement();

        if (filmExtraElement) {
          const filmExtraContainer = filmExtraElement.querySelector(`.films-list__container`);
          const filmsExtra = filmExtraComponent.getFilms();

          addFilmsToDOM(filmsExtra, filmExtraContainer, 0, FILMS_EXTRA_COUNT);

          render(container, filmExtraComponent);
        }
      });
    };

    const container = this._container.getElement();


    if (films.length) {
      renderMainFilms();
      renderExtraFilms();
    }
  }
}
