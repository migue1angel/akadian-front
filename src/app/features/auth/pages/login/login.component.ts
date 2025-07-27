import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
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
    Fluid,
    MessageModule,
    ErrorsAlertComponent
],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class LoginComponent {
  protected form: FormGroup;
  protected formErrors: string[] = [];

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  onSubmit() {
    this.formErrors.push('Error 1', 'Error 2');
    
    if (this.form.valid) {
      console.log('Login Data:', this.form.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Bienvenido',
      });
    } else {
      this.messageService.add({
        severity: 'secondary',
        summary: 'El formulario no es válido',
        key: 'formErrors'
      });
    }
  }
}
