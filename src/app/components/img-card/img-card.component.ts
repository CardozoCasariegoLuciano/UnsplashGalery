import { Component, Input } from '@angular/core';
import { ImgDirective } from '../../directives/img.directive';
import { UnsplashImages } from '../../interfaces/img.interfaces';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStore } from '../../store/app.reducer';
import { setSelectedImage } from '../../store/actions/select-img.actions';
import { ImageByID } from '../../interfaces/imgByID.interface';

@Component({
  selector: 'app-img-card',
  standalone: true,
  imports: [ImgDirective, SkeletonComponent],
  templateUrl: './img-card.component.html',
  styleUrl: './img-card.component.css',
})
export class ImgCardComponent {
  @Input() img!: UnsplashImages;

  constructor(private router: Router, private store: Store<AppStore>) {}

  navigateImgPage() {
    this.router.navigate(['image', this.img.id]);
    this.store.dispatch(setSelectedImage({ img: this.img as ImageByID }));
  }
}
