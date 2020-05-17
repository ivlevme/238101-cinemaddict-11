import {Comment} from '../const.js';
import {generateRandomArray, getRandomArrayItem, getRandomDate} from '../utils/common.js';


const generateComment = () => {
  return {
    id: String(new Date() + Math.random()),
    emoji: getRandomArrayItem(Comment.EMOJI),
    text: getRandomArrayItem(Comment.TEXT),
    author: getRandomArrayItem(Comment.AUTHOR),
    date: getRandomDate(),
  };
};

const generateComments = (count) => {
  return generateRandomArray(count, generateComment);
};


export {generateComments};
