import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutComponent } from './app-layout.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { DashboardComponent } from '../../main/dashboard/dashboard.component';

@NgModule({
  declarations: [AppLayoutComponent, DashboardComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  providers: []
})
export class AppLayoutModule {}
