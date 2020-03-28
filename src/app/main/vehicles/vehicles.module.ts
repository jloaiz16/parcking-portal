import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [VehiclesComponent],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class VehiclesModule { }
