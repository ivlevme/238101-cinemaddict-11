export default class Film {
  constructor(data) {
    return {
      id: data[`id`],
      actors: data[`film_info`][`actors`],
      ageLimit: data[`film_info`][`age_rating`],
      comments: data[`comments`],
      country: data[`film_info`][`release`][`release_country`],
      description: data[`film_info`][`description`],
      director: data[`film_info`][`director`],
      genres: data[`film_info`][`genre`],
      isFavorites: data[`user_details`][`favorite`],
      isWatched: data[`user_details`][`already_watched`],
      isWatchlist: data[`user_details`][`watchlist`],
      watchingDate: data[`user_details`][`watching_date`] ? new Date(data[`user_details`][`watching_date`]) : null,
      name: data[`film_info`][`title`],
      original: data[`film_info`][`alternative_title`],
      poster: data[`film_info`][`poster`],
      rating: data[`film_info`][`total_rating`],
      releaseDate: new Date(data[`film_info`][`release`][`date`]),
      runtime: data[`film_info`][`runtime`],
      writers: data[`film_info`][`writers`],
    };
  }

  static parseFilm(data) {
    return new Film(data);
  }

  static parseFilms(data) {
    return data.map(Film.parseFilm);
  }
}
