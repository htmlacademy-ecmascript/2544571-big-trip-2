import {FilterType} from '../const';
import {isPointInFuture, isPointInPast} from './point';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointInPast(point.dateFrom) && isPointInFuture(point.dateTo)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom)),
};

export {filter};
