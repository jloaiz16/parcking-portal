import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParckingComponent } from './parcking.component';
import { ParckingRoutingModule } from './parcking-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ParckingComponent],
  imports: [
    CommonModule,
    ParckingRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class ParckingModule { }
