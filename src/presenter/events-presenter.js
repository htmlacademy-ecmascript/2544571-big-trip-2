import TripEventsListView from '../view/trip-events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import { render, RenderPosition} from '../framework/render.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {sortPointDay, sortPointTime, sortPointPrice} from '../utils/point.js';
import {SortType} from '../const.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #listComponent = new TripEventsListView();
  #sortComponent = null;
  #noPointsComponent = new NoPointsView();

  #eventsPoints = [];
  #offers = null;
  #destinations = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#eventsPoints = [...this.#eventsModel.points];
    this.#eventsPoints.sort(sortPointDay);

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#eventsPoints = updateItem(this.#eventsPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#eventsPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#eventsPoints.sort(sortPointPrice);
        break;
      default:
        this.#eventsPoints.sort(sortPointDay);
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
  };

  #renderSort() {
    this.#sortComponent = new TripSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, this.#offers, this.#destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#eventsPoints
      .forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    render(this.#noPointsComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList() {
    render(this.#listComponent, this.#eventsContainer);
    this.#renderPoints();

  }

  #renderBoard() {
    this.#offers = this.#eventsModel.offers;
    this.#destinations = this.#eventsModel.destinations;

    if (this.#eventsPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }
}
