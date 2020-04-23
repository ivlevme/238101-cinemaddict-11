import AbstractComponent from "./abstract-component.js";


const createFilmsContainerTemplate = (isFilmsEmpty) => {
  const hiddenClass = isFilmsEmpty ? `` : `visually-hidden`;

  return (`
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title ${hiddenClass}">
          ${isFilmsEmpty ? `There are no movies in our database` : `All movies. Upcoming`}
        </h2>
        ${isFilmsEmpty ? `` : `<div class="films-list__container"></div>`}
      </section>
    </section>`).trim();
};


export default class FilmsContainer extends AbstractComponent {
  constructor(isFilmsEmpty) {
    super();

    this._isFilmsEmpty = isFilmsEmpty;
  }

  getTemplate() {
    return createFilmsContainerTemplate(this._isFilmsEmpty);
  }
}
