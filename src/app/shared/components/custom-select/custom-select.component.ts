import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { SvgDirective } from '../../../directives/svg.directive';

export interface CustomOptions {
  value: string | number;
  text: string | number;
}

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SvgDirective],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css',
})
export class CustomSelectComponent implements OnInit {
  @Input() options!: CustomOptions[];
  @Input() label?: string;
  @Input() control!: AbstractControl;

  @ViewChild('selector') selector?: ElementRef<HTMLDivElement>;
  isOptionVisible = false;
  selectedOption!: CustomOptions;
  blckShowOptions = true;

  ngOnInit(): void {
    const tet = this.options.find((p) => p.value === this.control.value);

    const initValue = tet || this.options[0];
    this.selectedOption = initValue;
  }

  showOptions() {
    if (this.blckShowOptions) {
      this.isOptionVisible = !this.isOptionVisible;
      this.selector?.nativeElement.classList.toggle('onFocus');
    } else {
      this.blckShowOptions = true;
    }
  }

  selectOption(option: CustomOptions) {
    this.selectedOption = option;
    this.blckShowOptions = false;
    this.isOptionVisible = false;
    this.control.setValue(option.value);
  }
}
