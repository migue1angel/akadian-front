import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },
  {
    path: 'core',
    loadChildren: () => import('./features/core/core.routes'),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('./common/pages/not-found/not-found.component'),
  },
];
