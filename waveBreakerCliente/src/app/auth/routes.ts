import { Routes } from '@angular/router';
import { leavePageGuard } from '../guards/leave-page.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canDeactivate: [leavePageGuard]
  },
];
