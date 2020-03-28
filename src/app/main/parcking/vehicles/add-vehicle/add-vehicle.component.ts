import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IVehicle } from 'src/app/shared/models/vehicle.model';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  public selected: string;
  public vehicleForm: FormGroup;
  public vehicle: IVehicle = {
    id: null,
    type: null,
    number_plate: null,
    date: null
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.vehicleForm = this.formBuilder.group({
      type: ['', Validators.required],
      number_plate: ['', Validators.required]
    });
  }
}
