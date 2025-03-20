// import {render} from './framework/render.js'; //для отрисовки кнопки новой задачи
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsContainer,
  eventsModel,
  filterModel,
});
const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  filterModel,
  eventsModel
});

// в демо проекте здесь отрисовка кнопки новой задачи

filterPresenter.init();
eventsPresenter.init();

