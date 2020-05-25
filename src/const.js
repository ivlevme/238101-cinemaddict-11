const FILMS_EXTRA_COUNT = 2;
const FILMS_EMPTY = 0;

const EMPTY_ARRAY_LENGTH = 0;
const INDEX_FIRST_ELEMENT_IN_ARRAY = 0;
const INDEX_NEXT_ELEMENT_IN_ARRAY = 1;

const INDEX_MISS_ELEMENT = -1;

const SHAKE_ANIMATION_TIMEOUT = 600;


const FILTER_CATEGORIES = [`Watchlist`, `History`, `Favorites`];
const SORT_BUTTONS = [`default`, `date`, `rating`];
const EMOJIS = [`smile`, `sleeping`, `puke`, `angry`];

const FILM_CATEGORIES = new Set([`Top Rated`, `Most Commented`]);

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

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

const Category = {
  TOP_RATED: `Top Rated`,
  MOST_COMMENTED: `Most Commented`,
};

const SortButtonText = {
  DEFAULT: `Sort by default`,
  DATE: `Sort by date`,
  RATING: `Sort by rating`,
};
const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
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

const HttpStatus = {
  OK: 200,
  REDIRECTION: 300,
};

const KeyboardKey = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
  ENTER: `Enter`,
};


export {
  FILMS_EXTRA_COUNT, EMOJIS, FILTER_CATEGORIES, FILMS_EMPTY, SHAKE_ANIMATION_TIMEOUT, SORT_BUTTONS,
  FILM_CATEGORIES, EMPTY_ARRAY_LENGTH, INDEX_FIRST_ELEMENT_IN_ARRAY, INDEX_NEXT_ELEMENT_IN_ARRAY,
  INDEX_MISS_ELEMENT, Category, FilterType, IndexMap, FilterDate, DeleteButtonText, ElementStatus,
  Color, UserRank, RankRatio, SortButtonText, SortType, HttpStatus, KeyboardKey,
};
