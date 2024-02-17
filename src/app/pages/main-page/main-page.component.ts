import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnsplashImages } from '../../interfaces/img.interfaces';
import { Store } from '@ngrx/store';
import { AppStore } from '../../store/app.reducer';
import { loadImg, loadSearchImg } from '../../store/actions/img.actions';
import { ImgGridComponent } from '../../components/img-grid/img-grid.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { Subscription } from 'rxjs';
import { FilterState } from '../../store/reducers/filters.redicer';
import { SearchComponent } from '../../components/search/search.component';
import { selectFilter } from '../../store/selectors/filter.selectors';

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

  constructor(private store: Store<AppStore>) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.listenFilters();
  }

  private listenFilters() {
    this.subs.add(
      this.store.select(selectFilter).subscribe({
        next: (filters) => {
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

//Usar la data del store al cargar tanto la data de una imagen, como de la lista completa
//TODO: maquetar pagina de imagen seleccionada + sus estadisticas ( y cumplir las reglas de unSplash)
//TODO: maquetar seccion de imagen random (sin parametros)
//TODO: Skipe Coleccions and topics
//TODO: maquetar pantalla de estadisticas de unsplash junto sus links
