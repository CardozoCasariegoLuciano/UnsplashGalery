import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStore } from '../../store/app.reducer';
import { resetFilter, setFilter } from '../../store/actions/filter.actions';
import { selectFilter } from '../../store/selectors/filter.selectors';
import { filter, take } from 'rxjs';
import { FilterState } from '../../store/reducers/filters.redicer';
import {
  CustomOptions,
  CustomSelectComponent,
} from '../../shared/components/custom-select/custom-select.component';
import {
  colorsOptions,
  orderByOptions,
  orientationOptions,
} from './seletcOptionsList';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CustomSelectComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  @Output() sendFilter = new EventEmitter<void>();
  @Input() query?: string;

  filterForm!: FormGroup;
  btnText!: string;

  orderByOptions: CustomOptions[] = orderByOptions;
  orientationOptions: CustomOptions[] = orientationOptions;
  colorOptions: CustomOptions[] = colorsOptions;

  constructor(private fb: FormBuilder, private store: Store<AppStore>) {}

  ngOnInit(): void {
    this.initForm();
    this.recoverStoreFilter();

    this.btnText = this.query
      ? `aplicar filtros para ${this.query}`
      : 'Aplicar los filtros en tu proxima busqueda';
  }

  private recoverStoreFilter() {
    this.store
      .select(selectFilter)
      .pipe(
        take(1),
        filter((form) => JSON.stringify(form) != '{}')
      )
      .subscribe({
        next: (form) => {
          this.filterForm.reset({
            content_safety:
              form.content_filter != undefined
                ? form.content_filter === 'low'
                : true,
            color: form.color || 'none',
            orientation: form.orientation || 'all',
            per_page: form.per_page || 15,
            order_by: form.order_by || 'relevant',
          });
        },
      });
  }

  private initForm() {
    this.filterForm = this.fb.group({
      content_safety: [true],
      color: ['none'],
      orientation: ['all'],
      per_page: [15],
      order_by: ['relevant'],
    });
  }

  onClearFilter() {
    this.filterForm.reset({
      content_safety: [true],
      color: ['none'],
      orientation: ['all'],
      per_page: [15],
      order_by: ['relevant'],
    });
    this.store.dispatch(resetFilter());
    this.sendFilter.emit();
  }

  apply() {
    const form = this.filterForm.value;

    const data: FilterState = {
      content_filter: form.content_safety ? 'low' : 'high',
      per_page: form.per_page,
      order_by: form.order_by,
      color: form.color,
      orientation: form.orientation,
    };

    this.store.dispatch(setFilter({ filter: data }));
    this.sendFilter.emit();
  }
}
