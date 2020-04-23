import {Film, Comment} from '../const.js';
import {generateRandomArray, getRandomArrayItem, getRandomIntegerNumber} from '../utils/common.js';


const COUNT_DAYS_IN_YEAR = 365;

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomIntegerNumber(0, 50);

  targetDate.setDate(targetDate.getDate() - COUNT_DAYS_IN_YEAR * diffValue);
  const diffValueHours = getRandomIntegerNumber(0, 24);
  const diffValueMinutes = getRandomIntegerNumber(0, 60);

  targetDate.setHours(targetDate.getHours() - diffValueHours);
  targetDate.setMinutes(targetDate.getMinutes() - diffValueMinutes);

  return targetDate;
};

const generateFilm = () => {
  const isFavorites = Math.random() > 0.5;
  const isHistory = Math.random() > 0.5;
  const isWatchlist = Math.random() > 0.5;

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
    releaseDate: getRandomDate(),
    runtime: getRandomDate(),
    writers: generateRandomArray(getRandomIntegerNumber(1, 4), Film.STAFF),
  };
};

const generateComment = () => {
  return {
    emoji: getRandomArrayItem(Comment.EMOJI),
    text: getRandomArrayItem(Comment.TEXT),
    author: getRandomArrayItem(Comment.AUTHOR),
    date: getRandomDate(),
  };
};

const generateFilms = (count) => {
  return generateRandomArray(count, generateFilm);
};


export {generateFilms};
