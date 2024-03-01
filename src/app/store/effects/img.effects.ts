import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadImg, loadSearchImg, setImgs } from '../actions/img.actions';
import { map, mergeMap } from 'rxjs';
import { ImgService } from '../../services/img.service';
import {
  loadSelectedImage,
  loadSelectedImageStatics,
  setImageStatics,
  setSelectedImage,
} from '../actions/select-img.actions';

@Injectable()
export class ImgEffect {
  constructor(private actions$: Actions, private imgService: ImgService) {}

  loadImg = createEffect(() =>
    this.actions$.pipe(
      ofType(loadImg),
      mergeMap((payload) =>
        this.imgService.getImages(payload.page).pipe(
          map((imgs) =>
            setImgs({
              img: imgs,
            })
          )
        )
      )
    )
  );

  loadSeachImg = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSearchImg),
      mergeMap((action) =>
        this.imgService.seachImg(action.filters).pipe(
          map((imgs) =>
            setImgs({
              img: imgs,
            })
          )
        )
      )
    )
  );

  loadSelectedData = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSelectedImage),
      mergeMap((action) =>
        this.imgService.seachImgByID(action.id).pipe(
          map((imgs) =>
            setSelectedImage({
              img: imgs,
            })
          )
        )
      )
    )
  );

  loadSelectedStatics = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSelectedImageStatics),
      mergeMap((action) =>
        this.imgService.seachImgStaticsByID(action.id).pipe(
          map((stats) =>
            setImageStatics({
              statics: stats,
            })
          )
        )
      )
    )
  );
}
