import { Component, OnInit } from '@angular/core';
import { IVehicle } from 'src/app/shared/models/vehicle.model';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-queue-vehicles',
  templateUrl: './queue-vehicles.component.html',
  styleUrls: ['./queue-vehicles.component.scss']
})
export class QueueVehiclesComponent implements OnInit {
  public vehicles: IVehicle[] = [];
  public headerOptions: string[] = [
    'Vehicle Type',
    'Number Plate',
    'Register date',
    'Actions'
  ];
  constructor(private service: StorageService) {
    this.service.getVehicles().subscribe(
      x => {
        this.vehicles.length = 0;
        x.map(item => {
          const data: any = item.payload.doc.data();
          const id = item.payload.doc.id;
          let vehicle: IVehicle = {
            id: null,
            type: null,
            number_plate: null,
            date: null
          };
          vehicle.id = id;
          vehicle.type = data.type;
          vehicle.number_plate = data.number_plate;
          vehicle.date = data.date;
          this.vehicles.push(vehicle);
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {}

  delete(id: string): void {
    this.service.deleteVehicle(id).then(response => {
      Swal.fire('Success', 'Vehicle was deleted succesfully', 'success');
    });
  }
}
