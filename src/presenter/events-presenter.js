import TripEventsListView from '../view/trip-events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListPointView from '../view/list-point-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  listComponent = new TripEventsListView();

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    console.log(this.eventsContainer)
    render(new TripSortView(), this.eventsContainer)
    render(this.listComponent, this.eventsContainer);
    render(new EditPointView(), this.listComponent.getElement());
    render(new AddNewPointView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new ListPointView(), this.listComponent.getElement());
    }
  }
}
