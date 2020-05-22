const FILMS_EXTRA_COUNT = 2;
const FILMS_EMPTY = 0;

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

const FILTER_CATEGORIES = [
  `Watchlist`,
  `History`,
  `Favorites`,
];

const IndexMap = {
  KEY: 0,
  VALUE: 1,
};

const FilterDate = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};


const Film = {
  CATEGORY: new Set([`Top Rated`, `Most Commented`]),
};

const Category = {
  TOP_RATED: `Top Rated`,
  MOST_COMMENTED: `Most Commented`,
};

const Comment = {
  EMOJI: [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`,
  ]
};

const Sort = {
  BUTTONS: [`default`, `date`, `rating`],
  BUTTON_TEXT: {
    DEFAULT: `Sort by default`,
    DATE: `Sort by date`,
    RATING: `Sort by rating`,
  },
  TYPE: {
    DATE: `date`,
    RATING: `rating`,
    DEFAULT: `default`,
  }
};

const User = {
  NAME: `Movie Buff`,
  RANK: `Sci-Fighter`,
};


export {FILMS_EXTRA_COUNT, Film, Category, Comment, Sort, FilterType, FILTER_CATEGORIES, IndexMap,
  FILMS_EMPTY, FilterDate, User};
