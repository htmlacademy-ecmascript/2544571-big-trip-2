import TripEventsListView from '../view/trip-events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';
import NoPointsView from '../view/no-points-view.js';

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

    this.#renderBoard();
  }

  #renderPoint(point) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      point, offers: this.#offers, destinations: this.#destinations,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointEditComponent = new EditPointView({
      point, offers: this.#offers, destinations: this.#destinations,
      onFormClose: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#listComponent.element);
  }

  #renderBoard() {
    this.#offers = this.#eventsModel.offers;
    this.#destinations = this.#eventsModel.destinations;

    if (this.#eventsPoints.length === 0) {
      render(new NoPointsView(), this.#eventsContainer);
      return;
    }

    render(new TripSortView(), this.#eventsContainer);
    render(this.#listComponent, this.#eventsContainer);

    for (let i = 0; i < 3; i++) {
      this.#renderPoint(this.#eventsPoints[i]);
    }
  }
}
