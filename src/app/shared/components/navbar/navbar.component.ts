import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { IconDirective } from '../../directives/icon.directive';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, IconDirective, ButtonModule],
  templateUrl: './navbar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Projects',
      icon: 'pi pi-search',
      badge: '3',
      items: [
        {
          label: 'Core',
          icon: 'pi pi-bolt',
          shortcut: '⌘+S',
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',
          shortcut: '⌘+B',
        },
        {
          separator: true,
        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil',
          shortcut: '⌘+U',
        },
      ],
    },
  ];
}
