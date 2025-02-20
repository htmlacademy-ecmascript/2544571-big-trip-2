import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';

function humanizeDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export {getRandomArrayElement, humanizeDate};
