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
  public headerOptions: any[] = [
    {
      name: 'Position',
      size: 10
    },
    {
      name: 'Vehicle Type',
      size: 20
    },
    {
      name: 'Number Plate',
      size: 20
    },
    {
      name: 'Register date',
      size: 30
    },
    {
      name: 'Actions',
      size: 20
    }
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
            waiting: null,
            date: null
          };
          vehicle.id = id;
          vehicle.type = data.type;
          vehicle.number_plate = data.number_plate;
          vehicle.date = data.date;
          vehicle.waiting = data.waiting;
          if (vehicle.waiting) {
            this.vehicles.push(vehicle);
          }
        });
        this.vehicles.sort((a, b) => {
          if (new Date(a.date) > new Date(b.date)) {
            return 1;
          } else if (new Date(a.date) < new Date(b.date)) {
            return -1;
          }
          return 0;
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

  add(vehicle: IVehicle): void {
    let vehicleUpdate = vehicle;
    vehicleUpdate.waiting = false;
    this.service.findLotFreeByTypeVehicle(vehicleUpdate);
  }
}
