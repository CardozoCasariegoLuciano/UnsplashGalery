import { createSelector } from '@ngrx/store';
import { AppStore } from '../app.reducer';
import { FilterState } from '../reducers/filters.redicer';

export const selectFilter = createSelector(
  (state: AppStore) => state.filter,
  (a: FilterState) => a
);
