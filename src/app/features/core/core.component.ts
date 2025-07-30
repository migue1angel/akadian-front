import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { UsersHttpService } from '../auth/services/users-http.service';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-core',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './core.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent {
  
}
