import { createSelector } from '@ngrx/store';
import { AppStore } from '../app.reducer';
import { SelectedState } from '../reducers/selected-img.reducer';

export const selectImg = createSelector(
  (state: AppStore) => state.selectedImg,
  (a: SelectedState) => a
);

export const selectImgData = createSelector(
  (state: AppStore) => state.selectedImg,
  (a: SelectedState) => ({ image: a.image, statics: a.statics })
);
