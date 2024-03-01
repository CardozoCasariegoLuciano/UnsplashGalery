import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnsplashImages } from '../../interfaces/img.interfaces';
import { Store } from '@ngrx/store';
import { AppStore } from '../../store/app.reducer';
import { loadImg, loadSearchImg } from '../../store/actions/img.actions';
import { ImgGridComponent } from '../../components/img-grid/img-grid.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { Subscription, take } from 'rxjs';
import { FilterState } from '../../store/reducers/filters.redicer';
import { SearchComponent } from '../../components/search/search.component';
import { selectFilter } from '../../store/selectors/filter.selectors';
import { selectImgList } from '../../store/selectors/img.selectors';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ImgGridComponent, SearchComponent, PaginationComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit, OnDestroy {
  imgList: UnsplashImages[] = [];
  page!: number;
  subs = new Subscription();
  firstTime = true;

  constructor(private store: Store<AppStore>) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.add(
      this.store
        .select(selectImgList)
        .pipe(take(1))
        .subscribe({
          next: (img) => {
            const hasNoContent = img.list.length <= 0;
            this.listenFilters(hasNoContent);
          },
        })
    );
  }

  private listenFilters(hasNoContent: boolean) {
    this.subs.add(
      this.store.select(selectFilter).subscribe({
        next: (filters) => {
          if (!hasNoContent && this.firstTime) {
            this.firstTime = false;
            return;
          }

          const data = this.prepareFilterData(filters);
          this.page = filters.page || 1;
          this.dispatchData(data);
        },
      })
    );
  }

  private prepareFilterData(filters: FilterState) {
    const data: FilterState = {};
    if (filters['query']) data.query = filters['query'];
    if (filters['color'] && filters['color'] != 'none')
      data.color = filters['color'];
    if (filters['orientation'] && filters['orientation'] != 'all')
      data.orientation = filters['orientation'];
    if (filters['content_filter'])
      data.content_filter = filters['content_filter'];
    if (filters['per_page']) data.per_page = filters['per_page'];
    if (filters['order_by']) data.order_by = filters['order_by'];
    if (filters['page']) data.page = filters['page'];
    return data;
  }

  private dispatchData(filters?: FilterState) {
    if (filters?.query) {
      this.store.dispatch(
        loadSearchImg({
          filters: filters,
        })
      );
    } else {
      this.store.dispatch(loadImg({ page: this.page }));
    }
  }
}

//TODO: maquetar pagina de imagen seleccionada + sus estadisticas ( y cumplir las reglas de unSplash)
//TODO que "estado" de la app se guarde en las queryParams
//TODO: maquetar seccion de imagen random (sin parametros)
//TODO: Skipe Coleccions and topics
//TODO: maquetar pantalla de estadisticas de unsplash junto sus links
