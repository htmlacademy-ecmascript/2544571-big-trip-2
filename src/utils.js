import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const DATE_FORMAT = 'MMM D';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';

function humanizeDate(date) {
  return date ? dayjs.utc(date).format(DATE_FORMAT) : '';
}

function humanizeTime(time) {
  return time ? dayjs.utc(time).format(TIME_FORMAT) : '';
}

function humanizeDateTime(dateTime) {
  return dateTime ? dayjs.utc(dateTime).format(DATE_TIME_FORMAT) : '';
}

function getTimeDifference(firstDate, secondDate) {
  const date1 = dayjs(firstDate);
  const date2 = dayjs(secondDate);
  return date1.diff(date2, 'h');
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export { getRandomArrayElement, humanizeDate, getTimeDifference, humanizeDateTime , humanizeTime };
