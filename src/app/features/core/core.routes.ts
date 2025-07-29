import { Route } from '@angular/router';
import { ClassListComponent } from './class-catalog/pages/class-list/class-list.component';
import { ClassDetailComponent } from './class-catalog/pages/class-detail/class-detail.component';
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
