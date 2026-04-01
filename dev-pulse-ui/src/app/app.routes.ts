import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard], 
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DashboardRoutes)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.authRoute)
  }
];
