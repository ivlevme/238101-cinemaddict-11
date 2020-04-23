import AbstractComponent from "./abstract-component.js";


const createFooterStatisticsTemplate = (countFilms) => {
  return (`
    <p>${countFilms} movies inside</p>
  `).trim();
};


export default class FooterStatistics extends AbstractComponent {
  constructor(countFilms) {
    super();

    this._countFilms = countFilms;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._countFilms);
  }
}

