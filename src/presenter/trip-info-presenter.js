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

  // get filters() {
  //   const points = this.#eventsModel.points;

  //   return Object.values(FilterType).map((type) => ({
  //     type,
  //     count: filter[type](points).length
  //   }));
  // }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView(this.#eventsModel.points);

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
