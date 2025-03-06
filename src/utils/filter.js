import {FilterType} from '../const';
import {isPointInFuture, isPointInPast, isPointSameOrInPast, isPointSameOrInFuture} from './point';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointSameOrInPast(point.dateFrom) && isPointSameOrInFuture(point.dateTo)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom)),
};

export {filter};
