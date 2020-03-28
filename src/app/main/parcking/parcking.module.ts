import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParckingComponent } from './parcking.component';
import { ParckingRoutingModule } from './parcking-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddVehicleComponent } from './vehicles/add-vehicle/add-vehicle.component';
import { QueueVehiclesComponent } from './vehicles/queue-vehicles/queue-vehicles.component';
import { ParckingLotsComponent } from './parcking-lots/parcking-lots.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ParckingComponent,
    AddVehicleComponent,
    QueueVehiclesComponent,
    ParckingLotsComponent
  ],
  imports: [
    CommonModule,
    ParckingRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: []
})
export class ParckingModule {}
