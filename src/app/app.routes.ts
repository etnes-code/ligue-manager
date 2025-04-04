import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/components/login-form/login-form.component').then(
        m => m.LoginFormComponent
      ),
  },
  {
    path: 'players',
    loadChildren: () =>
      import('./players/players.routes').then(m => m.PLAYERS_ROUTES),
  },
];
