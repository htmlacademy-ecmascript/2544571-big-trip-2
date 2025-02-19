
import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';


const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsContainer,
  pointsModel
});


render(new FiltersView(), filtersContainer);
eventsPresenter.init();

