import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IVehicle, IVehicleType } from 'src/app/shared/models/vehicle.model';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/shared/services/storage.service';
@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  public selected: string;
  // public parckingTypes: IParckingType[] = [];
  public vehicleTypes: IVehicleType[] = [];
  public vehicleForm: FormGroup;
  public vehicle: IVehicle = {
    id: null,
    type: null,
    waiting: null,
    number_plate: null,
    date: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private service: StorageService
  ) {
    this.service.getVehicleTypes().subscribe(
      (types: IVehicleType[]) => {
        this.vehicleTypes = types;
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
    this.vehicleForm = this.formBuilder.group({
      type: ['', Validators.required],
      number_plate: ['', Validators.required]
    });
  }

  register(): void {
    this.vehicle = this.vehicleForm.getRawValue();
    this.vehicle.date = new Date().toString();
    this.vehicle.waiting = false;
    this.service.tryParcking(this.vehicle);
    this.vehicleForm.reset();
  }
}
