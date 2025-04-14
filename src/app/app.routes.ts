import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./routes/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'players',
    loadChildren: () =>
      import('./players/players.routes').then(m => m.PLAYERS_ROUTES),
  },
];
