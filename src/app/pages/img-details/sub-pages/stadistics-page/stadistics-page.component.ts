import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppStore } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { selectImgData } from '../../../../store/selectors/selected-img.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stadistics-page',
  standalone: true,
  imports: [],
  templateUrl: './stadistics-page.component.html',
  styleUrl: './stadistics-page.component.css',
})
export class StadisticsPageComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  imgStadistics = {
    downloads: 0,
    likes: 0,
    views: 0,
  };

  userName!: string;

  userStadistics = {
    photos: 0,
    likes: 0,
    collections: 0,
  };

  constructor(private store: Store<AppStore>) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.setData();
  }

  private setData() {
    this.subs.add(
      this.store.select(selectImgData).subscribe({
        next: (val) => {
          if (val.statics) {
            this.imgStadistics.downloads = val.statics.downloads.total;
            this.imgStadistics.views = val.statics.views.total;
          } else {
            this.imgStadistics.downloads = val.image!.downloads;
            this.imgStadistics.views = val.image!.views;
          }
          this.imgStadistics.likes = val.image!.likes;

          this.userName = val.image!.user.username;
          this.userStadistics = {
            likes: val.image!.user.total_likes,
            photos: val.image!.user.total_photos,
            collections: val.image!.user.total_collections,
          };
        },
      })
    );
  }
}
