import TripEventsListView from '../view/trip-events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EditPointView from '../view/edit-point-view.js';
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
    render(new EditPointView({ point: this.#eventsPoints[0], offers: this.#offers, destinations: this.#destinations }), this.#listComponent.element);

    for (let i = 1; i < 4; i++) {
      render(new PointView({ point: this.#eventsPoints[i], offers: this.#offers, destinations: this.#destinations }), this.#listComponent.element);
    }
  }
}
