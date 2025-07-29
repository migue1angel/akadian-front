import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-class-detail',
  imports: [],
  templateUrl: './class-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassDetailComponent { }
