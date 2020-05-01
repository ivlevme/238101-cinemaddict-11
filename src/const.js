const FILMS_EXTRA_COUNT = 2;
const FILMS_EMPTY = 0;


const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const FILTER_CATEGORIES = [
  `Watchlist`,
  `History`,
  `Favorites`,
];

const IndexMap = {
  KEY: 0,
  VALUE: 1,
};


const Film = {
  DESCRIPTION: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ],
  POSTER: [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ],
  NAME: [
    `made for each other`,
    `popeye meets sinbad`,
    `sagebrush trail`,
    `santa claus conquers the martians`,
    `the dance of life`,
    `the great flamarion`,
    `the man with the golden arm`,
  ],
  GENRE: [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`
  ],
  STAFF: [
    `Anthony Mann`,
    `Anne Wigton`,
    `Heinz Herald`,
    `Richard Weil`,
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    `Dan Duryea`,
  ],
  CATEGORY: new Set([`Top Rated`, `Most Commented`]),
};

const Category = {
  TOP_RATED: `Top Rated`,
  MOST_COMMENTED: `Most Commented`,
};

const Comment = {
  TEXT: [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
  ],
  AUTHOR: [
    `John Doe`,
    `Tim Macoveev`,
  ],
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

export {MONTH_NAMES, FILMS_EXTRA_COUNT, Film, Category, Comment, Sort, FILTER_CATEGORIES,
  IndexMap, FILMS_EMPTY};
