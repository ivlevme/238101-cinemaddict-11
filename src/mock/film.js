import {Film, Comment} from '../const.js';
import {generateRandomArray, getRandomArrayItem, getRandomIntegerNumber} from '../util.js';


const countFilters = {
  favorite: 0,
  history: 0,
  watchlist: 0,
};

const generateFilm = () => {
  const isFavorites = Math.random() > 0.5;
  const isHistory = Math.random() > 0.5;
  const isWatchlist = Math.random() > 0.5;

  countFilters.favorite = isFavorites ? countFilters.favorite + 1 : countFilters.favorite;
  countFilters.history = isHistory ? countFilters.history + 1 : countFilters.history;
  countFilters.watchlist = isWatchlist ? countFilters.watchlist + 1 : countFilters.watchlist;

  return {
    actors: generateRandomArray(getRandomIntegerNumber(1, 4), Film.STAFF),
    ageLimit: getRandomIntegerNumber(0, 19),
    comments: generateRandomArray(getRandomIntegerNumber(0, 6), generateComment),
    country: `USA`,
    description: generateRandomArray(getRandomIntegerNumber(1, 6), Film.DESCRIPTION).join(` `),
    director: getRandomArrayItem(Film.STAFF),
    genres: generateRandomArray(getRandomIntegerNumber(1, 4), Film.GENRE),
    isFavorites,
    isHistory,
    isWatchlist,
    name: getRandomArrayItem(Film.NAME),
    original: getRandomArrayItem(Film.NAME),
    poster: getRandomArrayItem(Film.POSTER),
    rating: getRandomIntegerNumber(10, 100) / 10,
    releaseDate: `30 March 1945`,
    runtime: getRandomArrayItem(Film.DURATION),
    writers: generateRandomArray(getRandomIntegerNumber(1, 4), Film.STAFF),
  };
};

const generateComment = () => {
  return {
    emodji: getRandomArrayItem(Comment.EMOJI),
    text: getRandomArrayItem(Comment.TEXT),
    author: getRandomArrayItem(Comment.AUTHOR),
    date: getRandomArrayItem(Comment.DATE),
  };
};

const generateFilms = (count) => {
  return generateRandomArray(count, generateFilm);
};


export {generateFilms, countFilters};
