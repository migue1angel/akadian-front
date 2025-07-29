import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { StudentRegisterComponent } from './pages/student-register/student-register.component';
import { AuthComponent } from './auth.component';

const authRoutes: Route[] = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'student-register',
        component: StudentRegisterComponent,
      },
      {
        path: 'tutor-register',
        loadComponent: () =>
          import('./pages/tutor-register/tutor-register.component'),
      },
    ],
  },
];

export default authRoutes;
