import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterWidget {
  constructor(public router: Router) {}
}
