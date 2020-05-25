const FILMS_EXTRA_COUNT = 2;
const FILMS_EMPTY = 0;

const SHAKE_ANIMATION_TIMEOUT = 600;

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

const DeleteButtonText = {
  DEFAULT: `Delete`,
  DELETING: `Deleting`
};

const ElementStatus = {
  DISABLE: true,
  ENABLE: false,
};

const Color = {
  RED: `#FF0000`,
  NONE: ``,
};

const UserRank = {
  NONE: ``,
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`,
};

const RankRatio = {
  NONE: 0,
  NOVICE: 9,
  FAN: 20,
};


export {FILMS_EXTRA_COUNT, Film, Category, Comment, Sort, FilterType, FILTER_CATEGORIES, IndexMap,
  FILMS_EMPTY, FilterDate, SHAKE_ANIMATION_TIMEOUT, DeleteButtonText, ElementStatus, Color, UserRank,
  RankRatio};
