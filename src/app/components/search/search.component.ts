import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SvgDirective } from '../../directives/svg.directive';
import { Subscription } from 'rxjs';
import { FilterComponent } from '../filter/filter.component';
import { AppStore } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { setQuery } from '../../store/actions/filter.actions';
import { selectFilter } from '../../store/selectors/filter.selectors';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SvgDirective, ReactiveFormsModule, FilterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, OnDestroy {
  searchControl!: FormControl;
  searchValue?: string;
  subs = new Subscription();
  showFilters = false;
  hasFilters = false;

  constructor(private store: Store<AppStore>) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.searchControl = new FormControl('');
    this.listenQueryParams();
    this.listenHasFilters();
  }

  private listenHasFilters() {
    this.store.select(selectFilter).subscribe({
      next: (val) => {
        const temp = { ...val };
        if (!temp.color && !temp.order_by && !temp.content_filter) {
          this.hasFilters = false;
          return;
        }
        this.hasFilters = !!temp.query && Object.keys(temp).length >= 2;
      },
    });
  }

  private listenQueryParams() {
    this.subs.add(
      this.store.select(selectFilter).subscribe({
        next: (filter) => {
          this.searchValue = filter.query;
          this.searchControl.setValue(this.searchValue);
        },
      })
    );
  }

  search() {
    this.store.dispatch(setQuery({ query: this.searchControl.value }));
  }

  openFilters() {
    this.showFilters = !this.showFilters;
  }

  closeFilter() {
    this.showFilters = false;
  }
}
