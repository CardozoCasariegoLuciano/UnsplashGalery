import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../../store/app.reducer';
import { Subscription, distinctUntilChanged, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  loadSelectedImage,
  loadSelectedImageStatics,
} from '../../store/actions/select-img.actions';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ImageByID } from '../../interfaces/imgByID.interface';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ImgDirective } from '../../directives/img.directive';
import {
  CustomOptions,
  CustomSelectComponent,
} from '../../shared/components/custom-select/custom-select.component';
import { FormControl } from '@angular/forms';
import { Urls } from '../../interfaces/img.interfaces';

@Component({
  selector: 'app-img-details',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonComponent,
    ImgDirective,
    CustomSelectComponent,
    RouterModule,
  ],
  templateUrl: './img-details.component.html',
  styleUrl: './img-details.component.css',
})
export class ImgDetailsComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  img?: ImageByID;
  id?: string;

  constructor(
    private store: Store<AppStore>,
    private activateRoutes: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    const params = this.activateRoutes.snapshot.params;
    this.id = params['id'];

    this.getImgData();
  }

  private getImgData() {
    this.subs.add(
      this.store
        .select('selectedImg')
        .pipe(
          distinctUntilChanged((prev, next) => {
            return prev.image?.id === next.image?.id;
          }),
          take(100)
        )
        .subscribe({
          next: (img) => {
            if (!img.image) {
              this.store.dispatch(loadSelectedImage({ id: this.id! }));
            } else {
              this.img = img.image;

              if (!img.image.views) {
                this.store.dispatch(loadSelectedImageStatics({ id: this.id! }));
              }

              if (img.statics) {
                this.img = {
                  ...this.img,
                  views: img.statics.views.total,
                  downloads: img.statics.downloads.total,
                };
              }
            }
          },
        })
    );
  }
}
//TODO cancelar peticiones viejas
