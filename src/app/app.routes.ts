import type { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ROUTES_PATH } from './shared/constants/common-constants';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: ROUTES_PATH.MAIN },
  {
    component: MainPageComponent,
    path: ROUTES_PATH.MAIN,
  },
  {
    component: NotFoundPageComponent,
    path: ROUTES_PATH.NOT_FOUND,
  },
  { path: '**', redirectTo: ROUTES_PATH.NOT_FOUND },
];
