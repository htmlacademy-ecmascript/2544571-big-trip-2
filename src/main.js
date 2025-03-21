import {render} from './framework/render.js';
import { RenderPosition } from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import TripInfoView from './view/trip-info-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.trip-main');
const filtersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
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

render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN); // элемент для доп задания
render(new NewPointButtonView(), siteHeaderElement);

filterPresenter.init();
eventsPresenter.init();

