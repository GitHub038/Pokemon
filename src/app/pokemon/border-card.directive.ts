import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]',
  standalone: true
})
export class BorderCardDirective {
  private initialColor = "#f5f5f5"
  private defaultColor = "#009688"
  private defaultHeight = 180

  constructor(private el: ElementRef) { 
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor)
  }

  @Input ('pkmnBorderCard') borderColor: string; //avec Alias

  @HostListener("mouseenter") onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor)
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.setBorder(this.initialColor)
  }

  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`
  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4x ${color}`;
  }
}
