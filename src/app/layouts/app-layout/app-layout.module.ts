import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { DashboardComponent } from '../../main/dashboard/dashboard.component';
import { AppRoutingModule } from './app-layout.routing.module';

@NgModule({
  declarations: [AppLayoutComponent, DashboardComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: []
})
export class AppLayoutModule {}
