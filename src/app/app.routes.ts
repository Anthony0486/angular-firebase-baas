import { Routes } from '@angular/router';
import { authGuard } from './services/auth-guard.service'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/auth/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard] // 🔒 Protection de la route avec le Guard
  },
];
