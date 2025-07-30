import { Component, inject, OnInit, signal, computed } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router, RouterLink } from '@angular/router';

import { IconDirective } from '../../../../shared/directives/icon.directive';
import { CustomLabelDirective } from '../../../../shared/directives/custom-label.directive';
import { ErrorMessageDirective } from '../../../../shared/directives/custom-error.directive';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

import { FormUtils } from '../../../../shared/utils/form.utils';
import { AuthService } from '../../services/auth.service';
import { AuthFormEnum } from '../../../../shared/enums/fields.enum';

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    IconDirective,
    CustomLabelDirective,
    ErrorMessageDirective,
    RouterLink,
    SpinnerComponent,
  ],
  templateUrl: './tutor-register.component.html',
  providers: [MessageService],
})
export default class TutorRegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  protected readonly AuthFormEnum = AuthFormEnum;
  protected readonly loading = signal(false);
  protected form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group(
      {
        username: [null, Validators.required],
        email: [
          null,
          [Validators.required, Validators.pattern(FormUtils.emailPattern)],
        ],
        password: [
          null,
          [Validators.required, Validators.pattern(FormUtils.passwordPattern)],
        ],
        confirmPassword: [null, Validators.required],
      },
      {
        validators: [
          FormUtils.isFieldOneEqualFieldTwo('password', 'confirmPassword'),
        ],
      }
    );
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    try {
      await this.authService.register(this.form.value);
      await this.authService.getUserProfile();
      this.router.navigate(['/core']);
    } catch (error: any) {
      this.showError(
        'Error en el registro',
        error?.message || 'Error registering user'
      );
    } finally {
      this.loading.set(false);
    }
  }

  async googleLogin(): Promise<void> {
    this.loading.set(true);
    try {
      await this.authService.googleLogin();
      this.router.navigate(['/core']);
    } catch (error: any) {
      this.showError(
        'Google Login Error',
        error?.message || 'Error signing in with Google'
      );
    } finally {
      this.loading.set(false);
    }
  }

  private showError(summary: string, detail: string): void {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  get emailField() {
    return this.form.controls['email'];
  }

  get passwordField() {
    return this.form.controls['password'];
  }

  get confirmPasswordField() {
    return this.form.controls['confirmPassword'];
  }

  get usernameField() {
    return this.form.controls['username'];
  }
}
