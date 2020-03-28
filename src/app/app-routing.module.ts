import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layouts/app-layout/app-layout.module').then(
        m => m.AppLayoutModule
      )
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./layouts/login-layout/login-layout.module').then(
        m => m.LoginLayoutModule
      )
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

export const Routing = RouterModule.forRoot(routes);
