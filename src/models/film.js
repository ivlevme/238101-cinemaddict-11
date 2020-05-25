export default class Film {
  constructor(film) {
    this.id = film[`id`];
    this.actors = film[`film_info`][`actors`];
    this.ageLimit = film[`film_info`][`age_rating`];
    this.comments = film[`comments`];
    this.country = film[`film_info`][`release`][`release_country`];
    this.description = film[`film_info`][`description`];
    this.director = film[`film_info`][`director`];
    this.genres = film[`film_info`][`genre`];
    this.isFavorites = Boolean(film[`user_details`][`favorite`]);
    this.isWatched = Boolean(film[`user_details`][`already_watched`]);
    this.isWatchlist = Boolean(film[`user_details`][`watchlist`]);
    this.watchingDate = film[`user_details`][`watching_date`] ? new Date(film[`user_details`][`watching_date`]) : null;
    this.name = film[`film_info`][`title`];
    this.original = film[`film_info`][`alternative_title`];
    this.poster = film[`film_info`][`poster`];
    this.rating = film[`film_info`][`total_rating`];
    this.releaseDate = new Date(film[`film_info`][`release`][`date`]);
    this.runtime = film[`film_info`][`runtime`];
    this.writers = film[`film_info`][`writers`];
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "actors": this.actors,
        "age_rating": this.ageLimit,
        "alternative_title": this.original,
        "description": this.description,
        "director": this.director,
        "genre": this.genres,
        "poster": this.poster,
        "release": {
          "release_country": this.country,
          "date": this.releaseDate ? this.releaseDate.toISOString() : null,
        },
        "runtime": this.runtime,
        "title": this.name,
        "total_rating": this.rating,
        "writers": this.writers,
      },
      "user_details": {
        "already_watched": this.isWatched,
        "favorite": this.isFavorites,
        "watchlist": this.isWatchlist,
        "watching_date": this.watchingDate ? this.watchingDate.toISOString() : null,
      },
    };
  }

  static parseFilm(film) {
    return new Film(film);
  }

  static parseFilms(film) {
    return film.map(Film.parseFilm);
  }

  static clone(film) {
    return new Film(film.toRAW());
  }
}
