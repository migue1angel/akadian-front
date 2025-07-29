import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { Fluid } from 'primeng/fluid';
import { MessageModule } from 'primeng/message';
import { IconDirective } from '../../../../shared/directives/icon.directive';
import { ErrorsAlertComponent } from '../../../../shared/components/errors-alert/errors-alert.component';
import { CustomLabelDirective } from '../../../../shared/directives/custom-label.directive';
import { AuthFormEnum } from '../../../../common/enums/auth-register-form.enum';
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
    ErrorsAlertComponent,
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

  protected formErrors: string[] = [];
  protected form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).then(() => {
        this.router.navigate(['core']);
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Form is invalid',
        key: 'formErrors',
      });
    }
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
