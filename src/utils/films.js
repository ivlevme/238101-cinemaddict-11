import FilmController from "../controllers/film.js";


const renderFilms = (arrayFilms, container, commentsModel, onDataChange, onViewChange) => {
  return arrayFilms
    .map((film) => {
      const filmController = new FilmController(container, commentsModel, onDataChange, onViewChange);
      filmController.render(film);

      return filmController;
    });
};


export {renderFilms};
