import AbstractComponent from "./abstract-component.js";

import {countHoursFromMinuties, countRemainsMinutesFromHours} from "../utils/common.js";

import {IndexMap, FilterDate} from "../const.js";

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';


const INDEX_FIRST_ELEMENT_IN_ARRAY = 0;

const FilterDateText = {
  [FilterDate.ALL_TIME]: `All time`,
  [FilterDate.TODAY]: `Today`,
  [FilterDate.WEEK]: `Week`,
  [FilterDate.MONTH]: `Month`,
  [FilterDate.YEAR]: `Year`,
};


const filterDates = Object.values(FilterDate);

const createStatisticsMenuItemMarkup = (menuItem, isChecked) => {
  return (`
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter"
      id="statistic-${menuItem}" value="${menuItem}" ${isChecked ? `checked` : ``}>
    <label for="statistic-${menuItem}" class="statistic__filters-label">${FilterDateText[menuItem]}</label>
  `).trim();
};

const createStatisticsMenuMarkup = (activeFilter) => {
  return Array.from(filterDates)
    .map((filterDate) => {
      const isChecked = filterDate === activeFilter;
      return createStatisticsMenuItemMarkup(filterDate, isChecked);
    })
    .join(`\n`);
};

const createStatisticsTemplate = (statistic, topGenre) => {
  const {countWatchedFilms, totalDuration, activeFilter} = statistic;
  const durationHours = countHoursFromMinuties(totalDuration);
  const remainsDurationMinutes = countRemainsMinutesFromHours(totalDuration, durationHours);

  return (`
    <section class="statistic visually-hidden">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${createStatisticsMenuMarkup(activeFilter)}
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

const getSortedGenres = (genres) => {
  const topGenres = Object.entries(genres);
  const sortedTopGenres = topGenres.slice().sort((a, b) => b[IndexMap.VALUE] - a[IndexMap.VALUE]);

  return sortedTopGenres;
};

const getTopGenre = (sortedGenres) => {
  if (sortedGenres.length) {
    const topGenre = sortedGenres[INDEX_FIRST_ELEMENT_IN_ARRAY][IndexMap.KEY];
    return topGenre;
  }

  return ``;
};


export default class Statistics extends AbstractComponent {
  constructor(statistics) {
    super();

    this._statistics = statistics;

    this._sortedTopGenres = getSortedGenres(this._statistics.genres);
    this._topGenre = getTopGenre(this._sortedTopGenres);

    this.renderChart();
  }

  getTemplate() {
    return createStatisticsTemplate(this._statistics, this._topGenre);
  }

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

  setStatisticsFilterChangeHandler(handler) {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      handler(evt.target.value);
    });

    this._filterDateClickHandler = handler;
  }
}
