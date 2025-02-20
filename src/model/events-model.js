import {getRandomPoint} from '../mock/points.js';
import {getMockDestinationsList} from '../mock/destinations.js';
import {getMockOffersList} from '../mock/offers.js';

const POINTS_COUNT = 5;

export default class EventsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  destinations = getMockDestinationsList();
  offers = getMockOffersList();

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

}
