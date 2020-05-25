import FilmController from "../controllers/film.js";


const renderFilms = (films, container, filmsModels, commentsModel, onDataChange, onViewChange, api) => {
  return films
    .map((film) => {
      const filmController = new FilmController(container, filmsModels, commentsModel, onDataChange, onViewChange, api);
      filmController.render(film);

      return filmController;
    });
};


export {renderFilms};
