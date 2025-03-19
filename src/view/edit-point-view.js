import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDateTime } from '../utils/point.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  'id': '007',
  'basePrice': 0,
  'dateFrom': null,
  'dateTo': null,
  'destination': null,
  'isFavorite': false,
  'offers': [],
  'type': 'taxi'
};

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

function createOffersEditTemplate(checkedOffers, offersType, allOffers) {
  const selectedTypeOffersList = allOffers.find((offer) => offer.type === offersType).offers;

  const offersElements = selectedTypeOffersList.map((offer) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
        id="${offer.id}"
        type="checkbox"
        name="offers" value="${offer.id}" ${checkedOffers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('');

  return (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offersElements}
    </div>
  </section>`);
}

function createPicturesTemplate(destinationInfo) {
  const picturesList = destinationInfo.pictures;

  return (picturesList.map((picture) =>
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(''));
}

function createOptionsListTemplate(destinationInfo) {
  return (destinationInfo.map((destination) => `<option value="${destination.name}"></option>`).join(''));
}

function createEventTypesTemplate(chosenType) {
  return (EVENT_TYPES.map((type) => `
  <div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}"${type === chosenType ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
  </div>
  `).join(''));
}

function createEditNewPointTemplate(point, offers, destinations) {

  const { dateTo, dateFrom, type, offers: pointOffers, destination: pointDestination, basePrice } = point;

  const selectedDestination = destinations.find((x) => x.id === pointDestination);

  const editOffersTemplate = createOffersEditTemplate(pointOffers, type, offers);
  const picturesTemplate = createPicturesTemplate(selectedDestination);

  const destinationName = selectedDestination.name;

  const humanizedTimeFrom = humanizeDateTime(dateFrom);
  const humanizedTimeTo = humanizeDateTime(dateTo);

  const optionsListTemplate = createOptionsListTemplate(destinations);

  const eventTypesTemplate = createEventTypesTemplate(type);

  return (`<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypesTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" data-destination-name="${destinationName}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${optionsListTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizedTimeFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizedTimeTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${offers.find((offer) => offer.type === type).offers.length ? editOffersTemplate : ''}
                ${selectedDestination?.description.length || selectedDestination?.pictures.length ? `
                                    <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${selectedDestination.description}</p>
                    ${selectedDestination?.pictures.length ? `                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${picturesTemplate}
                      </div>
                    </div>` : ''}
                  </section>
                  ` : ''}
                </section>
              </form>
            </li>
`);
}

export default class PointEditView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;

  #handleFormSubmit = null;
  #handleFormClose = null;
  #datepickerFrom = null;
  #datepickerTo = null;


  constructor({ onFormSubmit, onFormClose, point = BLANK_POINT, offers, destinations }) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;

    this._restoreHandlers();
  }

  get template() {
    return createEditNewPointTemplate(this._state, this.#offers, this.#destinations);
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formCloseHandler);
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#eventTypeToogleHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#eventDestinationToogleHandler);
    this.element.querySelector('.event__details')
      .addEventListener('change', this.#eventOffersSelectHandler);

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #dateFromChangeHandler = () => {
    this._setState({
      dateFrom: this.element.querySelector('.flatpickr-input[name="event-start-time"]').value,
    });
    this.#datepickerTo.set('minDate',this.element.querySelector('.flatpickr-input[name="event-start-time"]').value);
  };

  #dateToChangeHandler = () => {
    this._setState({
      dateTo: this.element.querySelector('.flatpickr-input[name="event-end-time"]').value,
    });
    this.#datepickerFrom.set('maxDate',this.element.querySelector('.flatpickr-input[name="event-end-time"]').value);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #eventTypeToogleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [] // очистка выбранных офферов
    });
  };

  #eventDestinationToogleHandler = (evt) => {
    evt.preventDefault(); //ищем по названию оффер (ниже по коду)
    const newDestination = this.#destinations.find((x) => x.name === evt.target.value);
    if (newDestination === undefined) { //добавляет невозможность ввести что угодно в поле
      const inputElement = this.element.querySelector('.event__input--destination');
      inputElement.value = inputElement.dataset.destinationName;
      return;
    }
    this.updateElement({
      destination: newDestination.id,
    });
  };

  #eventOffersSelectHandler = (evt) => {
    evt.preventDefault();
    const formData = new FormData(this.element.querySelector('form'));
    this.updateElement({
      offers: formData.getAll('offers')
    });
  };

  #datepickerConfig = {
    minuteIncrement: 1,
    enableTime: true,
    dateFormat: 'Z',
    'time_24hr': true,
    altInput: true,
    altFormat: 'j/n/y H:i',
  };

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onClose: this.#dateFromChangeHandler,
        ...this.#datepickerConfig
      },
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#dateToChangeHandler,
        ...this.#datepickerConfig
      },
    );
  }

  static parsePointToState(point) {
    return {
      ...point,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    return point;
  }

}

