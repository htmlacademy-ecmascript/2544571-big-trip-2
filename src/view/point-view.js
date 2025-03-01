import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate, getTimeDifference, humanizeTime } from '../utils/task.js';

function createSelectedOffersTemplate(chosenOffers, allOffers) {

  const offersList = [];
  allOffers.forEach((type) => type.offers.forEach((offer) => chosenOffers.includes(offer.id) ? offersList.push(offer) : null));

  const offersElements = offersList.map((offer) =>
    `<li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`

  ).join('');

  return (`                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offersElements}
                </ul>`);
}

function createPointTemplate(point, offers, destinations) {

  const { basePrice, type, dateFrom, dateTo, isFavorite, offers: pointOffers, destination: pointDestination } = point;

  const selectedDestination = destinations.find((x) => x.id === pointDestination);

  const humanizedPointDateFrom = humanizeDate(dateFrom);
  const timeDifference = getTimeDifference(dateTo, dateFrom);
  const humanizedTimeFrom = humanizeTime(dateFrom);
  const humanizedTimeTo = humanizeTime(dateTo);
  const selectedOffersTemplate = createSelectedOffersTemplate(pointOffers, offers);

  return (`<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${humanizedPointDateFrom}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${selectedDestination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${humanizedTimeFrom}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${humanizedTimeTo}</time>
                  </p>
                  <p class="event__duration">${timeDifference}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                ${pointOffers ? selectedOffersTemplate : ''}
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`);
}

export default class PointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;

  #handleEditClick = null;

  constructor({ onEditClick, point, offers, destinations }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
