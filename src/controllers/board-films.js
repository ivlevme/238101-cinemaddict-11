import FilmCardComponent from "../components/film-card.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmExtraComponent from "../components/film-extra.js";
import DetailsPopupComponent from "../components/details-popup.js";
import {render, remove} from "../utils/render.js";
import {Film, FILMS_EXTRA_COUNT} from "../const.js";


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


export default class BoardFilmsController {
  constructor(container) {
    this._container = container;
  }

  render(films) {
    const renderMainFilms = () => {
      const filmsListContainer = container.querySelector(`.films-list__container`);
      let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

      addFilmsToDOM(films, filmsListContainer, 0, showingFilmsCount);

      const showMoreButtonComponent = new ShowMoreButtonComponent();

      showMoreButtonComponent.setClickHandler(() => {
        const prevFilmCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        addFilmsToDOM(films, filmsListContainer, prevFilmCount, showingFilmsCount);

        if (showingFilmsCount >= films.length) {
          remove(showMoreButtonComponent);
        }
      });

      render(container.querySelector(`.films-list`), showMoreButtonComponent);
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
