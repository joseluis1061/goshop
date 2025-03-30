import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'catalogo-productos',
    loadChildren: () => import('./features/web/web.routes').then(m => m.WEB_ROUTES),
  },
  {
    path: '',
    redirectTo: 'catalogo-productos',
    pathMatch: 'full'
  }
];
