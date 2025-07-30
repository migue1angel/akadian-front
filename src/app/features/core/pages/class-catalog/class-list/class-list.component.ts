import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-class-list',
  imports: [],
  templateUrl: './class-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassListComponent { }
