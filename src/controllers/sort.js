import {Sort} from "../const.js";
import {replace, render} from "../utils/render.js";

import SortComponent from "../components/sort.js";


export default class SortController {
  constructor(container, filmsModel, boardController) {
    this._container = container;

    this._filmsModel = filmsModel;
    this._boardController = boardController;

    this._sortComponent = null;
    this._activeSortType = Sort.TYPE.DEFAULT;


    this._onSortChange = this._onSortChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;

    const oldComponent = this._sortComponent;

    this._sortComponent = new SortComponent(this._activeSortType);
    this._sortComponent.setSortTypeChangeHandler(this._onSortChange);

    if (oldComponent) {
      replace(this._sortComponent, oldComponent);
      return;
    }

    render(container, this._sortComponent);
  }

  setSortType(sortType) {
    this._activeSortType = sortType;

    this.render();
  }

  _onSortChange(activeSortType) {
    this._filmsModel.setSortType(activeSortType);
    this._activeSortType = activeSortType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }

  hide() {
    this._sortComponent.hide();
  }

  show() {
    this._sortComponent.show();
  }
}
