import {SHAKE_ANIMATION_TIMEOUT} from "../const.js";

import moment from "moment";


const COUNT_MINUTES_IN_HOUR = 60;
const COUNT_MILLISECONDS_IN_SECOND = 1000;

const ZERO_MINUTES = 0;
const ONE_HOUR = 1;


const countHoursFromMinuties = (minutes) => {
  return Math.floor(moment.duration(minutes, `minutes`).asHours());
};

const countRemainsMinutesFromHours = (allMinuties, countHours) => {
  return allMinuties - countHours * COUNT_MINUTES_IN_HOUR;
};

const formatRuntime = (minutes) => {
  const countHours = countHoursFromMinuties(minutes);
  const countRemainsMinutes = countRemainsMinutesFromHours(minutes, countHours);

  const hoursFormat = countHours >= ONE_HOUR ? `${countHours}h` : ``;
  const minutesFormat = countRemainsMinutes > ZERO_MINUTES ? `${countRemainsMinutes}m` : ``;

  return `${hoursFormat} ${minutesFormat}`;
};

const formatCommentDate = (date) => {
  return moment(date).fromNow();
};

const shake = (component) => {
  component.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / COUNT_MILLISECONDS_IN_SECOND}s`;

  setTimeout(() => {
    component.style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
};

const isOnline = () => {
  return window.navigator.onLine;
};

const callHandlers = (handlers) => {
  handlers.forEach((handler) => handler());
};


export {formatRuntime, formatCommentDate, countHoursFromMinuties, countRemainsMinutesFromHours, shake,
  isOnline, callHandlers};
