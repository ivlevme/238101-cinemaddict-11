import {FILTER_CATEGORIES} from "../const.js";


const IndexMap = {
  KEY: 0,
  VALUE: 1,
};


const countFilterCaterories = (films) => {
  const state = new Map();

  FILTER_CATEGORIES.forEach((category) => {
    state.set(category, 0);
  });

  films.forEach((film) => {
    FILTER_CATEGORIES.forEach((category) => {
      const currentCategory = `is${category}`;

      state.set(category, film[currentCategory] ? state.get(category) + 1 : state.get(category));
    });
  });

  return state;
};

const createFilterTemplate = (films) => {
  const stateFilterCategories = countFilterCaterories(films);

  const filters = [];

  for (const stateFilterCategory of stateFilterCategories) {
    const name = stateFilterCategory[IndexMap.KEY];
    const count = stateFilterCategory[IndexMap.VALUE];

    filters.push(`<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`);
  }

  return filters.join(`\n`);
};


export {createFilterTemplate};
