import AbstractComponent from "./abstract-component.js";


const createFilmsLoadingTemplate = () => {
  return (`
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title">Loading...</h2>
      </section>
    </section>
  `).trim();
};


export default class FilmsLoading extends AbstractComponent {
  getTemplate() {
    return createFilmsLoadingTemplate();
  }
}
