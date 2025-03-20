import { render, RenderPosition, remove } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import { sortPointDay, sortPointTime, sortPointPrice } from '../utils/point.js';
import { SortType, UpdateType, UserAction } from '../const.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #listComponent = new TripEventsListView();
  #sortComponent = null;
  #noPointsComponent = new NoPointsView();

  #offers = null;
  #destinations = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#eventsModel.points].sort(sortPointDay);
      case SortType.PRICE:
        return [...this.#eventsModel.points].sort(sortPointPrice);
      case SortType.TIME:
        return [...this.#eventsModel.points].sort(sortPointTime);
    }
    return this.#eventsModel.points; // на всякий случай оставим
  }

  init() {
    this.#renderBoard();
  }

  // #handleLoadMoreButtonClick = () => {
  // здвесь у них обработчик кнопки "показать еще"

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#eventsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#eventsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true }); // у них тут еще сброс счетчика
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, this.#offers, this.#destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    render(this.#noPointsComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  //здесь в демке рендер кнопки "покзатать еще"

  #clearBoard({ resetSortType = false } = {}) {
    // здесь у них переменная для счетчика задач

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointsComponent);

    //Здесь у них условие на счетчик задач

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    // здесь они рисуют доп элемент, который нам не нужен
    this.#offers = this.#eventsModel.offers;
    this.#destinations = this.#eventsModel.destinations;

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#listComponent, this.#eventsContainer);
    this.#renderPoints(points);
  }
}
