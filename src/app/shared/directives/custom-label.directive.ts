import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomLabel]',
})
export class CustomLabelDirective implements OnInit {
  public label = input<string>();
  private el: ElementRef = inject(ElementRef);
  private element!: HTMLLabelElement;
  constructor() {
    this.element = this.el.nativeElement;
  }
  ngOnInit(): void {
    this.setLabel();
  }
  setLabel() {
    this.element.classList.add('font-semibold');
    this.element.textContent = `${this.label()}:`;
  }
}
