import { Route } from '@angular/router';
import { ClassListComponent } from './pages/class-catalog/class-list/class-list.component';
import { ClassDetailComponent } from './pages/class-catalog/class-detail/class-detail.component';
import { CoreComponent } from './core.component';

const coreRoutes: Route[] = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'class-catalog',
        children: [
          {
            path: 'class-list',
            component: ClassListComponent,
          },
          {
            path: 'class-detail',
            component: ClassDetailComponent,
          },
          {
            path: '',
            redirectTo: 'class-list',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        redirectTo: 'class-catalog',
        pathMatch: 'full',
      },
    ],
  },
];

export default coreRoutes;
