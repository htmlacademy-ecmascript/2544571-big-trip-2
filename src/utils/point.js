import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);
dayjs.extend(utc);

const TimeFormat = {
  DATE_FORMAT: 'MMM D',
  DATE_TIME_FORMAT: 'DD/MM/YY HH:mm',
  TIME_FORMAT: 'HH:mm'
};

function humanizeDate(date) {
  return date ? dayjs.utc(date).format(TimeFormat.DATE_FORMAT) : '';
}

function humanizeTime(time) {
  return time ? dayjs.utc(time).format(TimeFormat.TIME_FORMAT) : '';
}

function humanizeDateTime(dateTime) {
  return dateTime ? dayjs.utc(dateTime).format(TimeFormat.DATE_TIME_FORMAT) : '';
}

function getTimeDifference(firstDate, secondDate) {
  const date1 = dayjs(firstDate);
  const date2 = dayjs(secondDate);
  const difference = dayjs.duration(date1.diff(date2));

  const format = 'DD[D] HH[H] mm[M]';

  return difference.format(format).replace(/\b00D 00H\b/, '').replace(/\b00D\b/, '');
}

function isPointInPast(pointDate) {
  return pointDate && dayjs.utc().isAfter(pointDate);
}

function isPointInFuture(pointDate) {
  return pointDate && dayjs.utc().isBefore(pointDate);
}

function isPointSameOrInFuture(pointDate) {
  return pointDate && dayjs.utc().isSameOrBefore(pointDate);
}

function isPointSameOrInPast(pointDate) {
  return pointDate && dayjs.utc().isSameOrAfter(pointDate);
}

function sortPointDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointTime(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo)) - dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));
}

function sortPointPrice(pointA, pointB) {
  return pointA.basePrice - pointB.basePrice;
}

export {sortPointPrice, sortPointTime, sortPointDay, isPointSameOrInPast, isPointSameOrInFuture, isPointInFuture, isPointInPast, humanizeDate, getTimeDifference, humanizeDateTime, humanizeTime };
