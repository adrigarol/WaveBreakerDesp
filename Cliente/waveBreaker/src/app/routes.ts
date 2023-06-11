import { Routes } from "@angular/router";
import { AuthGuard } from "./guards/authGuard.guard";

export const APP_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/routes').then((m) => m.AUTH_ROUTES),
  },

  {
    path: 'game',
    loadChildren:()=>
    import('./main/routes').then((m)=>m.MAIN_ROUTES),
    canActivate: [AuthGuard]
  },

  {
    path: 'users',
    loadChildren:()=>
    import('./users/routes').then((m)=>m.USER_ROUTES),
  },

  {
    path: 'forum',
    loadChildren:()=>
    import('./forum/routes').then((m)=>m.FORUM_ROUTES),
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
