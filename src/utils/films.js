import FilmController from "../controllers/film.js";


const renderFilms = (arrayFilms, container, onDataChange, onViewChange) => {
  return arrayFilms
    .map((film) => {
      const filmController = new FilmController(container, onDataChange, onViewChange);
      filmController.render(film);

      return filmController;
    });
};


export {renderFilms};
