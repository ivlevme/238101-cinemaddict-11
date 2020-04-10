const createFilterMarkup = (filtersData) => {
  const filters = [];

  for (const filterData of filtersData) {
    const name = filterData[0];
    const count = filterData[1];
    filters.push(`<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`);
  }

  return filters.join(`\n`);
};


const createSiteMenuTemplate = (filters) => {
  return (`
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${createFilterMarkup(filters)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>

    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>

    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container"></div>
      </section>
    </section>
  `);
};


export {createSiteMenuTemplate};
