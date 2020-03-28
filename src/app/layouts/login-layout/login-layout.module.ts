import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './login-layout.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module'

@NgModule({
  declarations: [LoginLayoutComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    LoginRoutingModule,
    CommonModule
  ],
  providers: []
})
export class LoginLayoutModule { }
