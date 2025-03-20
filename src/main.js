import {render} from './framework/render.js';
import FiltersView from './view/filters-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import {generateFilter} from './mock/filter.js';


const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsContainer,
  eventsModel
});
const filters = generateFilter(eventsModel.points);

render(new FiltersView({filters}), filtersContainer);
eventsPresenter.init();

