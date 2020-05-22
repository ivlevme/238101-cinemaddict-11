import AbstractComponent from "./abstract-component.js";


const createProfileTemplate = (name) => {
  return (`
    <section class="header__profile profile">
      <p class="profile__rating">${name}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `).trim();
};


export default class Profile extends AbstractComponent {
  constructor(name) {
    super();

    this._name = name;
  }
  getTemplate() {
    return createProfileTemplate(this._name);
  }
}
