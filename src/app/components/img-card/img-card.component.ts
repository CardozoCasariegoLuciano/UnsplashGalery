import { Component, Input } from '@angular/core';
import { ImgDirective } from '../../directives/img.directive';
import { UnsplashImages } from '../../interfaces/img.interfaces';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-img-card',
  standalone: true,
  imports: [ImgDirective, SkeletonComponent],
  templateUrl: './img-card.component.html',
  styleUrl: './img-card.component.css',
})
export class ImgCardComponent {
  @Input() img!: UnsplashImages;

  constructor(private router: Router) {}

  navigateImgPage() {
    console.log(this.img);

    this.router.navigate(['image', this.img.id]);
  }
}
