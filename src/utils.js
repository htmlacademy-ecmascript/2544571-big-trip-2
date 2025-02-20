import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH mm';

function humanizeDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizeTime(time) {
  return time ? dayjs(time).format(TIME_FORMAT) : '';
}

function getTimeDifference(firstDate, secondDate) {
  const date1 = dayjs(firstDate);
  const date2 = dayjs(secondDate);
  return date1.diff(date2, 'h');
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export { getRandomArrayElement, humanizeDate, getTimeDifference, humanizeTime };
