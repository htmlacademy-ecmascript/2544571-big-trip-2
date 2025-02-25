
import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';


const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsContainer,
  eventsModel
});


render(new FiltersView(), filtersContainer);
eventsPresenter.init();

