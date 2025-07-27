import { Route } from '@angular/router';
import { ClassListComponent } from './class-catalog/pages/class-list/class-list.component';

const coreRoutes:Route[] = [
  {
    path: 'class-catalog',
    children:[
      {
        path: 'class-list',
        component: ClassListComponent,
      },
      {
        path: '',
        redirectTo: 'class-list',
        pathMatch: 'full',
      },
    ]
  },
];

export default coreRoutes;
