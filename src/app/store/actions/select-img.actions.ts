import { createAction, props } from '@ngrx/store';
import { ImageStatcis } from '../../interfaces/img-statics.interface';
import { ImageByID } from '../../interfaces/imgByID.interface';

export const setSelectedImage = createAction(
  '[IMAGE PAGE] setSelectedImage',
  props<{ img: ImageByID }>()
);

export const setImageStatics = createAction(
  '[IMAGE PAGE] setSelectedImageStatics',
  props<{ statics: ImageStatcis }>()
);

export const loadSelectedImage = createAction(
  '[IMAGE PAGE] load image',
  props<{ id: string }>()
);

export const loadSelectedImageStatics = createAction(
  '[IMAGE PAGE] load image statics',
  props<{ id: string }>()
);
