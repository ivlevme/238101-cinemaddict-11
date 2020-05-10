import AbstractComponent from "./abstract-component.js";


const createExtraFilmsTemlpate = (category) => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">${category}</h2>

      <div class="films-list__container">
      </div>
    </section>
  `).trim();
};


export default class FilmExtra extends AbstractComponent {
  constructor(category) {
    super();

    this._category = category;
  }

  getTemplate() {
    return createExtraFilmsTemlpate(this._category);
  }
}
