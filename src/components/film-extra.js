const createExtraFilmsTemplate = (category) => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">${category}</h2>

      <div class="films-list__container">
      </div>
    </section>
  `);
};


export {createExtraFilmsTemplate};
