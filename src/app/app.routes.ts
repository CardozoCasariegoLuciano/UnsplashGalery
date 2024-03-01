import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ImgDetailsComponent } from './pages/img-details/img-details.component';
import { AuthorPageComponent } from './pages/img-details/sub-pages/author-page/author-page.component';
import { StadisticsPageComponent } from './pages/img-details/sub-pages/stadistics-page/stadistics-page.component';

export const routes: Routes = [
  {
    path: 'search',
    component: MainPageComponent,
  },
  {
    path: 'image/:id',
    component: ImgDetailsComponent,
    children: [
      {
        path: 'author',
        component: AuthorPageComponent,
      },
      {
        path: 'statics',
        component: StadisticsPageComponent,
      },
      {
        path: '**',
        redirectTo: 'author',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'search',
  },

  //TODO no ser qlia y meter lazyLoad aca
];
