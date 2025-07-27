import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'errors-alert',
  imports: [ToastModule],
  templateUrl: './errors-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsAlertComponent {

  formErrors = input.required<string[]>();
 }
