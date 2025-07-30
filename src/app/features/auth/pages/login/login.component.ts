import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { IconDirective } from '../../../../shared/directives/icon.directive';
import { CustomLabelDirective } from '../../../../shared/directives/custom-label.directive';
import { AuthFormEnum } from '../../../../shared/enums/fields.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    IconDirective,
    MessageModule,
    CustomLabelDirective,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class LoginComponent {
  protected readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  protected readonly AuthFormEnum = AuthFormEnum;
  protected loading = signal<boolean>(false);

  protected form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log(this.form.errors);
      
      return;
    }
    this.loading.set(true);
    this.authService
      .login(this.form.value)
      .then(() => {
        this.loading.set(false);
        this.router.navigate(['core']);
      })
      .catch((error) => {
        console.error('Login error:', error.message);
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          detail: error.message,
        });
      });
  }

  googleLogin() {
    this.authService.googleLogin();
  }

  protected get email() {
    return this.form.get('email');
  }

  protected get password() {
    return this.form.get('password');
  }
}
