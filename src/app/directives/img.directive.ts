import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImg]',
  standalone: true,
})
export class ImgDirective implements OnInit {
  @Input() uwidth?: string;
  @Input() uheight?: string;
  @Input() alt?: string;
  @Input() url!: string;
  @Input('author') authorName?: string;

  constructor(
    private elmRef: ElementRef<HTMLImageElement>,
    private renrerer: Renderer2
  ) {}

  ngOnInit(): void {
    this.createImage();
  }

  private createImage() {
    const container = this.elmRef.nativeElement;
    this.elmRef.nativeElement.style.position = 'relative';

    const img = this.renrerer.createElement('img') as HTMLImageElement;
    const author = this.renrerer.createElement('p') as HTMLParagraphElement;
    img.src = this.prepareURL();
    img.alt = this.alt || '';

    img.style.borderRadius = '8px';
    img.style.userSelect = 'none';
    img.style.cursor = 'pointer';

    img.onload = () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      this.elmRef.nativeElement.appendChild(img);
      this.appendAuthorHover(author);
    };

    img.onmouseenter = () => {
      author.style.display = 'block';
    };

    img.onmouseout = () => {
      author.style.display = 'none';
    };
  }

  private appendAuthorHover(author: HTMLParagraphElement) {
    if (!this.authorName) return;

    author.innerText = `Created by ${this.authorName}`;
    author.style.fontSize = '14px';
    author.style.color = 'white';
    author.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    author.style.borderRadius = '8px 0px 0px 0px';
    author.style.padding = '2px 0px 2px 10px';
    author.style.width = '50%';
    author.style.position = 'absolute';
    author.style.top = '-14px';
    author.style.display = 'none';

    this.elmRef.nativeElement.appendChild(author);
  }

  prepareURL(): string {
    const width = this.uwidth ? `&w=${this.uwidth}` : '';
    const height = this.uheight ? `&h=${this.uheight}` : '';

    const url_array = this.url.split('?');
    const params_array = url_array[1].split('&');

    const params = params_array
      .filter((item) => !item.includes('w=') && !item.includes('fit='))
      .join('&');

    const src = `${url_array[0]}?${params}&fit=crop${width}${height}`;

    return src;
  }
}
