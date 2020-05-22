export default class Film {
  constructor(data) {
    this.id = data[`id`];
    this.actors = data[`film_info`][`actors`];
    this.ageLimit = data[`film_info`][`age_rating`];
    this.comments = data[`comments`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.description = data[`film_info`][`description`];
    this.director = data[`film_info`][`director`];
    this.genres = data[`film_info`][`genre`];
    this.isFavorites = Boolean(data[`user_details`][`favorite`]);
    this.isWatched = Boolean(data[`user_details`][`already_watched`]);
    this.isWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.watchingDate = data[`user_details`][`watching_date`] ? new Date(data[`user_details`][`watching_date`]) : null;
    this.name = data[`film_info`][`title`];
    this.original = data[`film_info`][`alternative_title`];
    this.poster = data[`film_info`][`poster`];
    this.rating = data[`film_info`][`total_rating`];
    this.releaseDate = new Date(data[`film_info`][`release`][`date`]);
    this.runtime = data[`film_info`][`runtime`];
    this.writers = data[`film_info`][`writers`];
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

  static parseFilm(data) {
    return new Film(data);
  }

  static parseFilms(data) {
    return data.map(Film.parseFilm);
  }

  static clone(data) {
    return new Film(data.toRAW());
  }
}
