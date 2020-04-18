const COUNT_DELETE_ELEMENTS = 1;


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

const getArrayNonrepeatingItems = (array, count) => {
  const resultArray = [];

  for (let i = 0; i < count; i++) {
    let getRandomIndexFilm = getRandomIntegerNumber(0, array.length);
    resultArray.push(array[getRandomIndexFilm]);
    array.splice(getRandomIndexFilm, COUNT_DELETE_ELEMENTS);
  }

  return resultArray;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatRuntime = (date) => {
  const hours = date.getHours() > 1 ? `${date.getHours()}h` : ``;
  const minutes = date.getMinutes() > 0 ? `${date.getMinutes()}m` : ``;
  return `${hours} ${minutes}`;
};


export {getRandomArrayItem, getRandomIntegerNumber, generateRandomArray, castTimeFormat,
  formatRuntime, getArrayNonrepeatingItems};
