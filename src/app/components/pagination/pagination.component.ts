import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SvgDirective } from '../../directives/svg.directive';
import { Store } from '@ngrx/store';
import { AppStore } from '../../store/app.reducer';
import { nextPage, prevPage } from '../../store/actions/filter.actions';
import { selectFilter } from '../../store/selectors/filter.selectors';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [SvgDirective],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit, OnDestroy {
  page!: number;
  subs = new Subscription();

  constructor(private store: Store<AppStore>) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.add(
      this.store.select(selectFilter).subscribe({
        next: (filter) => {
          this.page = Number(filter.page) || 1;
        },
      })
    );
  }

  nextPage() {
    this.store.dispatch(nextPage());
  }

  prevPage() {
    this.store.dispatch(prevPage());
  }
}

//TODO agregar un input para elegir a que pagina navegar
