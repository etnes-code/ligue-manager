import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'players',
    loadChildren: () =>
      import('./players/players.routes').then(m => m.PLAYERS_ROUTES),
  },
];
