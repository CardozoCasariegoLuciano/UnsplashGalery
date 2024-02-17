import { createAction, props } from '@ngrx/store';
import { UnsplashImages } from '../../interfaces/img.interfaces';
import { FilterState } from '../reducers/filters.redicer';

export const loadImg = createAction('[] LOAD_IMG', props<{ page?: number }>());

export const setImgs = createAction(
  '[] SET_IMG',
  props<{ img: UnsplashImages[] }>()
);

export const loadSearchImg = createAction(
  '[] LOAD_SEARCH_IMG',
  props<{ filters: FilterState }>()
);
