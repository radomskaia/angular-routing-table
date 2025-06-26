import type { SORT_DIRECTION, SORT_ORDER } from '../constants/sort-constants';

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
export type SortDirection =
  (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];
