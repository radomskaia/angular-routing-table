import type { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    component: MainPageComponent,
    path: 'main',
  },
  {
    component: NotFoundPageComponent,
    path: '404',
  },
  { path: '**', redirectTo: '404' },
];
