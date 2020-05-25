import {render, replace} from "../utils/render.js";
import {FilterDate} from "../const.js";


import StatisticsComponent from "../components/statistics.js";


export default class StatisticsController {
  constructor(container, filmsModel, profileComponent) {
    this._container = container;

    this._filmsModel = filmsModel;
    this._profileComponent = profileComponent;

    this._statisticsComponent = null;

    this._activeStatisticsFilter = FilterDate.ALL_TIME;

    this._onStatisticsFilterChange = this._onStatisticsFilterChange.bind(this);
    this._onStatisticsFilterDataChange = this._onStatisticsFilterDataChange.bind(this);

    this._filmsModel.setStatisticsFilterChangeHandler(this._onStatisticsFilterDataChange);
  }

  render() {
    const oldStatisticsComponent = this._statisticsComponent;

    this._statisticsComponent = new StatisticsComponent(this._filmsModel.getStatistics());
    this._statisticsComponent.setStatisticsFilterChangeHandler(this._onStatisticsFilterChange);


    if (oldStatisticsComponent) {
      const isStatisticsComponentShow = oldStatisticsComponent.getElement().classList.contains(`visually-hidden`);

      if (!isStatisticsComponentShow) {
        this._statisticsComponent.getElement().classList.remove(`visually-hidden`);
      }

      replace(this._statisticsComponent, oldStatisticsComponent);
      return;
    }

    render(this._container, this._statisticsComponent);
  }

  hide() {
    this._statisticsComponent.hide();
  }

  show() {
    this._statisticsComponent.show();
    this.render();
  }

  setStatisticsFilter(statisticsFilter) {
    this._activeStatisticsFilter = statisticsFilter;
    this._filmsModel.setStatisticsFilter(statisticsFilter);
  }

  _onStatisticsFilterChange(statisticsFilter) {
    this.setStatisticsFilter(statisticsFilter);
  }

  _onStatisticsFilterDataChange() {
    this.render();
  }
}
