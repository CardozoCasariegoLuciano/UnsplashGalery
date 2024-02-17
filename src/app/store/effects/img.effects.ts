import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadImg, loadSearchImg, setImgs } from '../actions/img.actions';
import { map, mergeMap } from 'rxjs';
import { ImgService } from '../../services/img.service';

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
}
