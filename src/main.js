import {render} from './framework/render.js';
import FiltersView from './view/filters-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';

const filters = [
  {
    type: 'everything',
    count: 0,
  },
];

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsContainer,
  eventsModel
});

render(new FiltersView({
  filters,
  currentFilterType: 'everything',
  onFilterTypeChange: () => {}
}), filtersContainer);
eventsPresenter.init();

