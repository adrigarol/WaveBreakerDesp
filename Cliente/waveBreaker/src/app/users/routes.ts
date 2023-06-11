import { Routes } from '@angular/router';
import { userResover } from './resolvers/user.resolver';
import { AuthGuard } from '../guards/authGuard.guard';
import { leavePageGuard } from '../guards/leave-page.guard';

export const USER_ROUTES: Routes = [

  {
    path: 'edit',
    loadComponent: () =>
      import('../auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [AuthGuard],
    canDeactivate: [leavePageGuard]


  },
  {
    path: 'ranking',
    loadComponent: () =>
      import('./user-ranking/user-ranking.component').then(
        (m) => m.UserRankingComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
      canActivate: [AuthGuard],
      resolve: {
        user: userResover
      }
  },

];
