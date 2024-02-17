import { createSelector } from '@ngrx/store';
import { AppStore } from '../app.reducer';
import { ImgState } from '../reducers/img.reducer';

export const selectImgList = createSelector(
  (state: AppStore) => state.imgList,
  (a: ImgState) => a
);
