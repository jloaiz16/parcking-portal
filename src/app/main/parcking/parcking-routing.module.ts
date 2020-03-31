import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParckingComponent } from './parcking.component';

const routes: Routes = [
  {
    path: '',
    component: ParckingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParckingRoutingModule {}