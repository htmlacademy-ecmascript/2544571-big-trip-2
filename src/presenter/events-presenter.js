import TripEventsListView from '../view/trip-events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import { render, RenderPosition } from '../framework/render.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import { sortPointDay, sortPointTime, sortPointPrice } from '../utils/point.js';
import { SortType } from '../const.js';

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
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList() {
    // здесь у них счетчик отрисованных и порционная отрисовка
    const points = this.points;
    render(this.#listComponent, this.#eventsContainer);
    this.#renderPoints(points);
    // здесь у них логика отрисовки loadMoreButton
  }

  #renderBoard() {
    this.#offers = this.#eventsModel.offers;
    this.#destinations = this.#eventsModel.destinations;

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }
}
