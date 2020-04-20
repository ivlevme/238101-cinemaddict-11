const FILMS_EXTRA_COUNT = 2;

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
  CATEGORY: [
    `Top rated`,
    `Most commented`,
  ],
  CATEGORY_INDEX: {
    topRated: 0,
    mostCommented: 1,
  },
  SORT_PARAM: {
    comments: `comments.length`,
    rating: `rating`,
  }
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
    `angry`,
    `puke`,
    `sleeping`,
    `smile`,
  ]
};

export {MONTH_NAMES, FILMS_EXTRA_COUNT, Film, Comment, FILTER_CATEGORIES, IndexMap};
