import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css',
})
export class SkeletonComponent {
  @Input() width?: string;
  @Input() height?: string;
  @Input() circle?: boolean;
  @Input() radius?: string;

  get styles() {
    return `
      width: ${this.width ? this.width : ' 400px'};
      height: ${this.height ? this.height : ' 400px'};
      border-radius: ${this.getRadius};
  `;
  }

  get getRadius() {
    if (this.circle) {
      return `100%`;
    } else {
      return this.radius ? this.radius : '8px';
    }
  }
}
