import { Action, createReducer, on } from '@ngrx/store';
import {
  loadSelectedImage,
  loadSelectedImageStatics,
  setImageStatics,
  setSelectedImage,
} from '../actions/select-img.actions';
import { ImageStatcis } from '../../interfaces/img-statics.interface';
import { ImageByID } from '../../interfaces/imgByID.interface';

export interface SelectedState {
  image?: ImageByID;
  statics?: ImageStatcis;
  isLoading: boolean;
  isLoadingStatics: boolean;
}

const initState: SelectedState = {
  isLoading: false,
  isLoadingStatics: false,
};

const _SelectedImageReducer = createReducer(
  initState,

  on(setSelectedImage, (state, payload) => ({
    ...state,
    image: payload.img,
    isLoading: false,
  })),

  on(setImageStatics, (state, payload) => ({
    ...state,
    statics: payload.statics,
    isLoadingStatics: false,
  })),

  on(loadSelectedImage, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(loadSelectedImageStatics, (state) => ({
    ...state,
    isLoadingStatics: true,
  }))
);

export function SelectedImageReducer(
  state: SelectedState | undefined,
  action: Action
) {
  return _SelectedImageReducer(state, action);
}
