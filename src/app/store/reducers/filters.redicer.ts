import { Action, createReducer, on } from '@ngrx/store';
import {
  FilterColor,
  FilterContent,
  FilterOrderBy,
  FilterOrientation,
} from '../../interfaces/filter.interface';
import {
  nextPage,
  prevPage,
  resetFilter,
  setFilter,
  setQuery,
} from '../actions/filter.actions';

export interface FilterState {
  query?: string;
  content_filter?: FilterContent;
  color?: FilterColor;
  orientation?: FilterOrientation;
  per_page?: number;
  order_by?: FilterOrderBy;
  page?: number;
}

const initState: FilterState = {};

const _FilterReducer = createReducer(
  initState,

  on(setFilter, (state, payload) => {
    const ret = {
      ...state,
      content_filter: payload.filter.content_filter,
      color: payload.filter.color,
      orientation: payload.filter.orientation,
      per_page: payload.filter.per_page,
      order_by: payload.filter.order_by,
      page: payload.filter.page,
    };
    if (payload.filter.query) ret.query = payload.filter.query;
    return ret;
  }),

  on(resetFilter, (state) => ({ query: state.query })),

  on(setQuery, (state, payload) => ({
    ...state,
    query: payload.query,
    page: 1,
  })),

  on(nextPage, (state) => {
    if (state.page && state.page >= 2) {
      return { ...state, page: Number(state.page) + 1 };
    } else {
      return { ...state, page: 2 };
    }
  }),

  on(prevPage, (state) => {
    if (state.page && state.page > 1) {
      return { ...state, page: state.page - 1 };
    }
    return { ...state };
  })
);

export function FilterReducer(state: FilterState | undefined, action: Action) {
  return _FilterReducer(state, action);
}
