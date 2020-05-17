import {Film} from '../const.js';
import {generateRandomArray, getRandomArrayItem, getRandomIntegerNumber, getRandomDate} from '../utils/common.js';


const COUNT_MINUTES_IN_DAY = 1440;


const generateFilm = (commentIds) => {
  const isFavorites = Math.random() > 0.5;
  const isWatched = Math.random() > 0.5;
  const isWatchlist = Math.random() > 0.5;

  return {
    id: String(new Date() + Math.random()),
    actors: generateRandomArray(getRandomIntegerNumber(1, 4), Film.STAFF),
    ageLimit: getRandomIntegerNumber(0, 19),
    comments: generateRandomArray(getRandomIntegerNumber(0, 6), commentIds),
    country: `USA`,
    description: generateRandomArray(getRandomIntegerNumber(1, 6), Film.DESCRIPTION).join(` `),
    director: getRandomArrayItem(Film.STAFF),
    genres: generateRandomArray(getRandomIntegerNumber(1, 4), Film.GENRE),
    isFavorites,
    isWatched,
    isWatchlist,
    name: getRandomArrayItem(Film.NAME),
    original: getRandomArrayItem(Film.NAME),
    poster: getRandomArrayItem(Film.POSTER),
    rating: getRandomIntegerNumber(10, 100) / 10,
    releaseDate: getRandomDate(),
    runtime: getRandomDate().getMinutes() + getRandomIntegerNumber(0, COUNT_MINUTES_IN_DAY),
    writers: generateRandomArray(getRandomIntegerNumber(1, 4), Film.STAFF),
  };
};

const generateFilms = (count, comments) => {
  const commentIds = comments.map((comment) => comment.id);

  return new Array(count)
    .fill(``)
    .map(() => generateFilm(commentIds));
};


export {generateFilms};
