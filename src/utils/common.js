import moment from "moment";


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
  const countMinutes = date - countHours * 60;

  const hours = countHours > 1 ? `${countHours}h` : ``;
  const minutes = countMinutes > 0 ? `${countMinutes}m` : ``;

  return `${hours} ${minutes}`;
};


export {getRandomArrayItem, getRandomIntegerNumber, generateRandomArray, formatRuntime};
