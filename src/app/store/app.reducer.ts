import { ActionReducerMap } from '@ngrx/store';
import { ImgReducer, ImgState } from './reducers/img.reducer';
import { FilterReducer, FilterState } from './reducers/filters.redicer';

export interface AppStore {
  imgList: ImgState;
  filter: FilterState;
}

export const AppReducer: ActionReducerMap<AppStore> = {
  imgList: ImgReducer,
  filter: FilterReducer,
};
