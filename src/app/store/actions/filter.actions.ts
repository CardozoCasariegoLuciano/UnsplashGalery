import { createAction, props } from '@ngrx/store';
import { FilterState } from '../reducers/filters.redicer';

export const setFilter = createAction(
  '[FILTER Component] setFilter',
  props<{
    filter: FilterState;
  }>()
);

export const setQuery = createAction(
  '[SEARCH Component] setQuery',
  props<{
    query: string;
  }>()
);

export const resetFilter = createAction('[FILTER Component] reset filter');

export const nextPage = createAction(
  '[Paginator Component] nextPage',
);

export const prevPage = createAction(
  '[Paginator Component] prevPage',
);
