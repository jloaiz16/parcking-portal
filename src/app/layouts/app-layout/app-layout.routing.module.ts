import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('src/app/main/dashboard/dashboard.module').then(
            m => m.DashboardModule
          )
      },
      {
        path: 'parcking',
        loadChildren: () =>
          import('src/app/main/parcking/parcking.module').then(
            m => m.ParckingModule
          )
      },
      {
        path: 'vehicles',
        loadChildren: () =>
          import('src/app/main/vehicles/vehicles.module').then(
            m => m.VehiclesModule
          )
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
