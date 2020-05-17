import moment from "moment";


const COUNT_MINUTES_IN_HOUR = 60;
const COUNT_DAYS_IN_YEAR = 365;


const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const generateRandomArray = (count, element) => {
  return new Array(count)
    .fill(``)
    .map(typeof element === `function` ? element : () => getRandomArrayItem(element));
};

const formatRuntime = (date) => {
  const countHours = Math.floor(moment.duration(date, `minutes`).asHours());
  const countMinutes = date - countHours * COUNT_MINUTES_IN_HOUR;

  const hours = countHours >= 1 ? `${countHours}h` : ``;
  const minutes = countMinutes > 0 ? `${countMinutes}m` : ``;

  return `${hours} ${minutes}`;
};

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

const formatCommentDate = (date) => {
  return moment(date).fromNow();
};


export {getRandomArrayItem, getRandomIntegerNumber, generateRandomArray, formatRuntime, getRandomDate,
  formatCommentDate};
