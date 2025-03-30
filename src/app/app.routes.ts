import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'web',
    loadChildren: () => import('./features/web/web.routes').then(m => m.WEB_ROUTES),
  },
  {
    path: '',
    redirectTo: 'web',
    pathMatch: 'full'
  }
];
