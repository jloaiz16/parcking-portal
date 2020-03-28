import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-layout.routing.module';

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    RouterModule
  ],
  providers: []
})
export class AppLayoutModule {}
