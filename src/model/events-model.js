import Observable from '../framework/observable.js';
import {getRandomPoint} from '../mock/points.js';
import {getMockDestinationsList} from '../mock/destinations.js';
import {getMockOffersList} from '../mock/offers.js';

const POINTS_COUNT = 3;

export default class EventsModel extends Observable {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  #destinations = getMockDestinationsList();
  #offers = getMockOffersList();

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

}
