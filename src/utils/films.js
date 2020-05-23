import FilmController from "../controllers/film.js";


const renderFilms = (arrayFilms, container, filmsModels, commentsModel, onDataChange, onViewChange, api) => {
  return arrayFilms
    .map((film) => {
      const filmController = new FilmController(container, filmsModels, commentsModel, onDataChange, onViewChange, api);
      filmController.render(film);

      return filmController;
    });
};


export {renderFilms};
