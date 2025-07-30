import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FormUtils } from '../utils/form.utils';

@Directive({
  selector: '[appErrorMessage]',
  standalone: true,
})
export class ErrorMessageDirective implements OnInit {
  private readonly el: ElementRef = inject(ElementRef);
  private element!: HTMLLabelElement;
  constructor() {
    this.element = this.el.nativeElement;
  }

  public errors = input<ValidationErrors | null>(null);
  public touched = input<boolean>(false);
  public dirty = input<boolean>(false);

  ngOnInit(): void {
    this.element = this.el.nativeElement;
  }

  setErrorMessage = effect(() => {
    const errors = this.errors();
    const touched = this.touched();
    const dirty = this.dirty();

    if (!this.element) return;

    if (!errors || !touched) {
      this.element.classList.add('hidden');
      return;
    }

    this.element.classList.remove('hidden');
    this.element.classList.add('text-primary', 'text-sm');

    const errorKeys = errors ? Object.keys(errors) : [];

    if (errorKeys.includes('required')) {
      this.element.innerText = 'Field required';
      return;
    }

    if (errorKeys.includes('minlength')) {
      const min = errors['minlength']['requiredLength'];
      const current = errors['minlength']['actualLength'];
      this.element.innerText = `${current}/${min} required characters`;
      return;
    }

    if (errorKeys.includes('email')) {
      this.element.innerText = 'Invalid email format';
      return;
    }
    if (errorKeys.includes('pattern')) {
      const requiredPattern = errors['pattern']['requiredPattern'];

      if (
        requiredPattern === FormUtils.passwordPattern
      ) {
        this.element.innerText =
          'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number';
      } else {
        this.element.innerText = 'Invalid format';
      }

      return;
    }

    if (errorKeys.length > 0) {
      this.element.innerText = 'Invalid field';
    }
  });
}
