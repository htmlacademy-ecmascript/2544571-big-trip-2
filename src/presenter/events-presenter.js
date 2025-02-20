import TripEventsListView from '../view/trip-events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  listComponent = new TripEventsListView();

  constructor({eventsContainer, eventsModel}) {
    this.eventsContainer = eventsContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.eventsPoints = [...this.eventsModel.getPoints()];
    this.offers = this.eventsModel.getOffers();
    this.destinations = this.eventsModel.getDestinations();

    render(new TripSortView(), this.eventsContainer);
    render(this.listComponent, this.eventsContainer);
    render(new EditPointView({point: this.eventsPoints[0],offers: this.offers, destinations: this.destinations}), this.listComponent.getElement());
    render(new AddNewPointView({point: this.eventsPoints[1],offers: this.offers, destinations: this.destinations}), this.listComponent.getElement());

    for (let i = 2; i < 5; i++) {
      render(new PointView({point: this.eventsPoints[i],offers: this.offers, destinations: this.destinations}), this.listComponent.getElement());
    }
  }
}
