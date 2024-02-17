import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { search_icon } from '../shared/icons/search.icon';
import { filter_icon } from '../shared/icons/filter.icon';
import { Icons } from '../shared/icons/icons.interface';
import { arrowLeft } from '../shared/icons/arrow-left.icon';
import { arrowRigth } from '../shared/icons/arrow-right';
import { chevron_down } from '../shared/icons/chevron-down.icon';
import { chevron_up } from '../shared/icons/chevron-up.icon';

@Directive({
  selector: '[appSvg]',
  standalone: true,
})
export class SvgDirective implements OnInit {
  @Input() svgName!: string;
  @Input() set svgGlobalClass(svgClassName: string | undefined) {
    this.svgClass = svgClassName;
  }
  @Input() svgColor?: string;
  @Input() svgWidth?: string;
  @Input() svgHeight?: string;
  @Output('click') triggerAction = new EventEmitter<void>();
  @Input() svgPointer?: boolean | '';

  svgClass: string | undefined = 'default-svg';
  constructor(private elmRef: ElementRef<HTMLDivElement>) {}

  ngOnInit(): void {
    this.elmRef.nativeElement.innerHTML = this.selectSVG();

    this.elmRef.nativeElement.style.display = 'flex';
    (this.svgPointer == '' || this.svgPointer) &&
      (this.elmRef.nativeElement.style.cursor = 'pointer');
  }

  private selectSVG() {
    let result_icon: string = '';
    const props: Icons = {
      className: this.svgClass,
      color: this.svgColor,
      //NOTA: no todos los SVG usan los width y height
      //TODO: agregarlo
      width: this.svgWidth,
      height: this.svgHeight,
    };

    switch (this.svgName) {
      case 'search':
        result_icon = search_icon(props);
        break;
      case 'filter':
        result_icon = filter_icon(props);
        break;

      case 'arrow-left':
        result_icon = arrowLeft(props);
        break;

      case 'arrow-rigth':
        result_icon = arrowRigth(props);
        break;

      case 'chevron-up':
        result_icon = chevron_up(props);
        break;

      case 'chevron-down':
        result_icon = chevron_down(props);
        break;

      default:
        result_icon = filter_icon(props);
        break;
    }
    return result_icon;
  }
}
