import { Routes } from '@angular/router';


export const GAME_ROUTES: Routes = [
  {
    path: 'upgrades',
    loadComponent: () =>
      import('./upgrade-page/upgrade-page.component').then(
        (m) => m.UpgradePageComponent
      ),

  },

];
