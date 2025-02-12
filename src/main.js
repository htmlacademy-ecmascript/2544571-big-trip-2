
import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import EventsPresenter from './presenter/events-presenter.js';


const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({eventsContainer: tripEventsContainer});


render(new FiltersView(), filtersContainer);
eventsPresenter.init();


