const createProfileTemplate = (profile) => {
  const {name, avatar} = profile;

  return (`
    <section class="header__profile profile">
      <p class="profile__rating">${name}</p>
      <img class="profile__avatar" src="images/${avatar}@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `);
};


export {createProfileTemplate};
