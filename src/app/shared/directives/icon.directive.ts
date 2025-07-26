import {
  Directive,
  ElementRef,
  input,
  effect,
} from '@angular/core';
import { HEROICONS } from '../icons/heroicons';

@Directive({
  selector: '[appIcon]',
})
export class IconDirective {
  public name = input.required<keyof typeof HEROICONS>({ alias: 'appIcon' });
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>('lg');

  constructor(private readonly el: ElementRef) {}

  loadIcon = effect(() => {
    const host = this.el.nativeElement as HTMLElement;
    const svgRaw = HEROICONS[this.name()] ?? '';
    const sizeClass = {
      xs: 'w-2 h-2',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-10 h-10',
      xxl: 'w-12 h-12',
    }[this.size()];

    const wrapped = svgRaw.replace('class="', `class="${sizeClass}`);
    host.innerHTML = wrapped;
  });
}
