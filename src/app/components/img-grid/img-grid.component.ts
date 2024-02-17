import { Component, signal } from '@angular/core';
import { UnsplashImages } from '../../interfaces/img.interfaces';
import { ImgCardComponent } from '../img-card/img-card.component';
import { Store } from '@ngrx/store';
import { AppStore } from '../../store/app.reducer';
import { selectImgList } from '../../store/selectors/img.selectors';
import { SpinerComponent } from '../../shared/components/spiner/spiner.component';

@Component({
  selector: 'app-img-grid',
  standalone: true,
  imports: [ImgCardComponent, SpinerComponent],
  templateUrl: './img-grid.component.html',
  styleUrl: './img-grid.component.css',
})
export class ImgGridComponent {
  imgList = signal<UnsplashImages[]>([]);
  isLoading: boolean = true;

  constructor(private store: Store<AppStore>) {}

  ngOnInit(): void {
    this.listenImgChanges();
  }

  private listenImgChanges() {
    this.store.select(selectImgList).subscribe({
      next: (resp) => {
        this.imgList.set(resp.list);
        this.isLoading = resp.isLoading;
      },
    });
  }
}
