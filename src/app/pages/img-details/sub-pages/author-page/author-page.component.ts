import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, distinctUntilChanged, take } from 'rxjs';
import { AppStore } from '../../../../store/app.reducer';
import { ImageByID } from '../../../../interfaces/imgByID.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author-page.component.html',
  styleUrl: './author-page.component.css',
})
export class AuthorPageComponent {
  subs: Subscription = new Subscription();
  img?: ImageByID;

  constructor(private store: Store<AppStore>) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
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
            if (img.image) {
              this.img = img.image;
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
