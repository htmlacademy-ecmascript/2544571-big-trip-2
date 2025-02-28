import TripEventsListView from '../view/trip-events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
// import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render } from '../framework/render.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #listComponent = new TripEventsListView();

  #eventsPoints = [];
  #offers = null;
  #destinations = null;

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#eventsPoints = [...this.#eventsModel.points];
    this.#offers = this.#eventsModel.offers;
    this.#destinations = this.#eventsModel.destinations;

    render(new TripSortView(), this.#eventsContainer);
    render(this.#listComponent, this.#eventsContainer);

    for (let i = 0; i < 3; i++) {
      this.#renderPoint(this.#eventsPoints[i]);
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointView({ point, offers: this.#offers, destinations: this.#destinations });

    render(pointComponent, this.#listComponent.element);
  }
}
