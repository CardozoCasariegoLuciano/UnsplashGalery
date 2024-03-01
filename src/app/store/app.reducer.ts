import { ActionReducerMap } from '@ngrx/store';
import { ImgReducer, ImgState } from './reducers/img.reducer';
import { FilterReducer, FilterState } from './reducers/filters.redicer';
import {
  SelectedImageReducer,
  SelectedState,
} from './reducers/selected-img.reducer';

export interface AppStore {
  imgList: ImgState;
  filter: FilterState;
  selectedImg: SelectedState;
}

export const AppReducer: ActionReducerMap<AppStore> = {
  imgList: ImgReducer,
  filter: FilterReducer,
  selectedImg: SelectedImageReducer,
};
