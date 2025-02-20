import TripEventsListView from '../view/trip-events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  listComponent = new TripEventsListView();

  constructor({eventsContainer, pointsModel}) {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.EventsPoints = [...this.pointsModel.getPoints()];

    render(new TripSortView(), this.eventsContainer);
    render(this.listComponent, this.eventsContainer);
    render(new EditPointView({point: this.EventsPoints[0]}), this.listComponent.getElement());
    render(new AddNewPointView({point: this.EventsPoints[1]}), this.listComponent.getElement());

    for (let i = 2; i < 5; i++) {
      render(new PointView({point: this.EventsPoints[i]}), this.listComponent.getElement());
    }
  }
}
