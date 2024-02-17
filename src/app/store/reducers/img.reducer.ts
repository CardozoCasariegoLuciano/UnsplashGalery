import { Action, createReducer, on } from '@ngrx/store';
import { UnsplashImages } from '../../interfaces/img.interfaces';
import {
  loadImg,
  loadSearchImg,
  setImgs,
} from '../actions/img.actions';

export interface ImgState {
  list: UnsplashImages[];
  isLoading: boolean;
  loaded: boolean;
  error: any;
}

const initState: ImgState = {
  list: [],
  isLoading: false,
  loaded: false,
  error: null,
};

const _ImgReducer = createReducer(
  initState,
  on(loadImg, (state) => ({ ...state, isLoading: true, loaded: false })),
  on(loadSearchImg, (state) => ({ ...state, isLoading: true, loaded: false })),

  on(setImgs, (state, payload) => ({
    ...state,
    isLoading: false,
    loaded: true,
    list: payload.img,
  }))
);

export function ImgReducer(state: ImgState | undefined, action: Action) {
  return _ImgReducer(state, action);
}
