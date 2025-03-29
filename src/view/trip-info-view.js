import AbstractView from '../framework/view/abstract-view.js';
import { sortPointDay } from '../utils/point.js';

function createNewTripInfoTemplate(eventsModel) {
  const sortedPoints = eventsModel.points.sort(sortPointDay);

  const getDestinationName = (point) => eventsModel.destinations.find((x) => x.id === point.destination)?.name;



  const firstPoint = sortedPoints[0];
  console.log(firstPoint);
  console.log(eventsModel.destinations);

  const firstPointDestination = eventsModel.destinations.find((x) => x.id === firstPoint.destination);
  console.log(firstPointDestination);

  return `  <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva ${eventsModel.points.length}${getDestinationName(sortedPoints[0])} </h1>

              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>
          </section>`;
}

export default class TripInfoView extends AbstractView {
  #eventsModel = null;

  constructor(eventsModel) {
    super();
    this.#eventsModel = eventsModel;
  }

  get template() {
    return createNewTripInfoTemplate(this.#eventsModel);
  }
}
