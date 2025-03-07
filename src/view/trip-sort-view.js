import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

function createTripSortTemplate() {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">
              <label class="trip-sort__btn" data-sort-type="${SortType.DAY}" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
              <label class="trip-sort__btn" data-sort-type="${SortType.TIME}" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>
              <label class="trip-sort__btn" data-sort-type="${SortType.PRICE}" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`);
}

export default class TripSortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createTripSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if ((evt.target.tagName !== 'LABEL') | (evt.target.dataset.sortType === undefined)) { // дополнительная проверка элемента на который кликнули
      return;
    }

    evt.preventDefault();
    document.querySelector('input.trip-sort__input:checked').removeAttribute('checked');
    // поиск инпута с активным checked и удаление этого состояния
    document.querySelector(`input:has(+ label[data-sort-type="${evt.target.dataset.sortType}"])`).setAttribute('checked', '');
    // поиск инпута и установка для него состояния checked
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
