import AbstractSmartComponent from "./abstract-smart-component.js";

import {countHoursFromMinuties, countRemainsMinutesFromHours} from "../utils/common.js";

import {IndexMap} from "../const.js";

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';


const INDEX_FIRST_ELEMENT_IN_ARRAY = 0;

// TODO: после подлючения сервера - сделать фильтрацию по датам
const createStatisticsTemplate = (countWatchedFilms, totalDuration, topGenre) => {
  const durationHours = countHoursFromMinuties(totalDuration);
  const remainsDurationMinutes = countRemainsMinutesFromHours(totalDuration, durationHours);

  return (`
    <section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${countWatchedFilms} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${durationHours} <span class="statistic__item-description">h</span>${remainsDurationMinutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>
  `).trim();
};

const getAllStatistics = (films) => {
  const watchedFilms = films.filter((film) => film.isWatched);

  const statistic = {
    watchedFilms: 0,
    totalDuration: 0,
    topGenres: {},
  };

  watchedFilms.forEach((film) => {
    statistic.watchedFilms = film.isWatched ? statistic.watchedFilms + 1 : statistic.watchedFilms;
    statistic.totalDuration += film.runtime;
    film.genres.forEach((genre) => {
      statistic.topGenres[genre] = statistic.topGenres[genre] ? statistic.topGenres[genre] + 1 : 1;
    });
  });

  return statistic;
};


export default class Statistics extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;

    this._allStatictics = null;
    this._countWatchedFilms = null;
    this._totalDuration = null;
    this._sortedTopGenres = null;
    this._topGenre = null;

    this._setStatisticsData();

    this.renderChart();
  }

  getTemplate() {
    return createStatisticsTemplate(this._countWatchedFilms, this._totalDuration, this._topGenre);
  }

  _setStatisticsData() {
    this._allStatictics = getAllStatistics(this._filmsModel.getFilmsAll());

    this._countWatchedFilms = this._allStatictics.watchedFilms;
    this._totalDuration = this._allStatictics.totalDuration;
    this._sortedTopGenres = this._getSortedGenres();

    if (this._sortedTopGenres.length) {
      this._topGenre = this._sortedTopGenres[INDEX_FIRST_ELEMENT_IN_ARRAY][IndexMap.KEY];
      return;
    }

    this._topGenre = ``;
  }

  _getSortedGenres() {
    const topGenres = Object.entries(this._allStatictics.topGenres);
    const sortedTopGenres = topGenres.slice().sort((a, b) => b[IndexMap.VALUE] - a[IndexMap.VALUE]);

    return sortedTopGenres;
  }

  recoveryListeners() {}

  renderChart() {
    const topGenresLabels = this._sortedTopGenres.map((topGenre) => topGenre[IndexMap.KEY]);
    const topGenresData = this._sortedTopGenres.map((topGenre) => topGenre[IndexMap.VALUE]);

    const BAR_HEIGHT = 50;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    statisticCtx.height = BAR_HEIGHT * topGenresLabels.length;

    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: topGenresLabels,
        datasets: [{
          data: topGenresData,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });

    return myChart;
  }

  rerender() {
    this._setStatisticsData();

    super.rerender();

    this.renderChart();
  }

  show() {
    super.show();

    this.rerender();
  }
}
