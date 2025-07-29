import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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
import { IconDirective } from '../../../../shared/directives/icon.directive';
import { ErrorsAlertComponent } from '../../../../shared/components/errors-alert/errors-alert.component';
import { CustomLabelDirective } from '../../../../shared/directives/custom-label.directive';
import { AuthFormEnum } from '../../../../common/enums/auth-register-form.enum';
import { FormUtils } from '../../../../common/utils/form.utils';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-register',
  imports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    IconDirective,
    ErrorsAlertComponent,
    CustomLabelDirective,
    RouterLink
  ],
  templateUrl: './student-register.component.html',
  providers: [MessageService],
})
export class StudentRegisterComponent implements OnInit {
  protected formErrors: string[] = [];
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  protected readonly AuthFormEnum = AuthFormEnum;

  protected form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.form = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [
          FormUtils.isFieldOneEqualFieldTwo('password', 'confirmPassword'),
        ],
      }
    );
  }




  onSubmit() {
    if (this.form.valid) {
      this.authService.register(this.form.value);
    } else {
      console.log(this.form.errors);

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

  protected get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  protected get username() {
    return this.form.get('username');
  }
}
