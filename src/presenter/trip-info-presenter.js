import {render, replace, remove, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #eventsModel = null;

  #tripInfoComponent = null;

  constructor({tripInfoContainer, eventsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    if (this.#eventsModel.points.length === 0 || this.#eventsModel.destinations.length === 0) {
      return;
    } // условие, чтобы отрисовка происходила только если данные есть

    this.#tripInfoComponent = new TripInfoView(this.#eventsModel);

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
