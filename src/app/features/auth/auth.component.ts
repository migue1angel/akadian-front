import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent { }
