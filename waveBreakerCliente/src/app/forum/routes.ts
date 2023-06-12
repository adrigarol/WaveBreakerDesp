import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/authGuard.guard';
import { leavePageGuard } from '../guards/leave-page.guard';

export const FORUM_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./forum-page/forum-page.component').then(
        (m) => m.ForumPageComponent
      ),
  },

  {
    path: 'create',
    loadComponent: () =>
      import('./forum-form/forum-form.component').then(
        (m) => m.ForumFormComponent
      ),
      canActivate:[AuthGuard],
      canDeactivate:[leavePageGuard],
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent
      ),
      canDeactivate:[leavePageGuard],
  },

];
