import AbstractComponent from "./abstract-component.js";


const createProfileTemplate = (profile) => {
  const {name, avatar} = profile;

  return (`
    <section class="header__profile profile">
      <p class="profile__rating">${name}</p>
      <img class="profile__avatar" src="images/${avatar}@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `).trim();
};


export default class Profile extends AbstractComponent {
  constructor(profile) {
    super();

    this._profile = profile;
  }

  getTemplate() {
    return createProfileTemplate(this._profile);
  }
}
