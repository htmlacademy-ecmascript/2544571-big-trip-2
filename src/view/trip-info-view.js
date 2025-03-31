import AbstractView from '../framework/view/abstract-view.js';
import { sortPointDay } from '../utils/point.js';
import dayjs from 'dayjs';

function createNewTripInfoTemplate(eventsModel) {
  if (eventsModel.points.length === 0) {
    return `  <section class="trip-main__trip-info  trip-info">
          </section>`;
  }

  const sortedPoints = eventsModel.points.sort(sortPointDay);
  const getDestinationName = (destination) => eventsModel.destinations.find((x) => x.id === destination)?.name;

  const uniqDestinations = [];
  sortedPoints.forEach((element) => {
    if (element.destination !== uniqDestinations[uniqDestinations.length - 1]) {
      uniqDestinations.push(element.destination);
    }
  });

  const uniqDestinationsNames = uniqDestinations.map((element) => getDestinationName(element));

  const firstPointName = uniqDestinationsNames[0];
  const secondPointName = uniqDestinationsNames.length === 3 ? `&mdash; ${uniqDestinationsNames[1]}` : '';
  const lastPointName = uniqDestinationsNames.length > 1 ? `&mdash; ${uniqDestinationsNames[uniqDestinationsNames.length - 1]}` : '';
  const dots = uniqDestinationsNames.length > 3 ? '&mdash; ...' : '';

  const isMonthYearEqual = (firstDate, secondDate) => dayjs(firstDate).format('MM YYYY') === dayjs(secondDate).format('MM YYYY');
  const startDate = sortedPoints[0].dateFrom;
  const endDate = sortedPoints[sortedPoints.length - 1].dateTo;

  const humanizedStartDate = isMonthYearEqual(startDate, endDate) ? dayjs(startDate).format('D') : dayjs(startDate).format('D MMM');
  const humanizedEndDate = dayjs(endDate).format('D MMM');

  const totalSum = sortedPoints.reduce((accumulator, point) => {
    const allOffers = eventsModel.offers;
    const pointTypeOffers = allOffers.find((offer) => offer.type === point.type).offers;
    return accumulator + point.basePrice + point.offers.reduce((innerAccumulator, offerId) => innerAccumulator + pointTypeOffers.find((offer) => offer.id === offerId).price, 0);
  }, 0);

  return `  <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${firstPointName} ${secondPointName} ${dots} ${lastPointName} </h1>

              <p class="trip-info__dates">${humanizedStartDate}&nbsp;&mdash;&nbsp;${humanizedEndDate}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
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
