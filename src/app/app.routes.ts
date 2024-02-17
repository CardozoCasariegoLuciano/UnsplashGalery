import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RandomImageComponent } from './pages/random-image/random-image.component';
import { AboutComponent } from './pages/about/about.component';
import { ImgDetailsComponent } from './pages/img-details/img-details.component';

export const routes: Routes = [
  {
    path: 'search',
    component: MainPageComponent,
  },
  {
    path: 'random',
    component: RandomImageComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'image/:id',
    component: ImgDetailsComponent,
  },
  {
    path: '**',
    redirectTo: 'search',
  },
];
