import { Component, OnInit } from '@angular/core';
import { IParckingLot } from 'src/app/shared/models/parcking.model';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IVehicle } from 'src/app/shared/models/vehicle.model';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-parcking-lots',
  templateUrl: './parcking-lots.component.html',
  styleUrls: ['./parcking-lots.component.scss']
})
export class ParckingLotsComponent implements OnInit {
  public lots: IParckingLot[] = [];
  public smallSubTotal: number;
  public smallTotal: number;
  public mediumSubTotal: number;
  public mediumTotal: number;
  public largeSubTotal: number;
  public largeTotal: number;
  public selection: IVehicle = {
    id: null,
    type: null,
    number_plate: null,
    waiting: null,
    date: null
  };
  public lotIdSelection: string;

  constructor(private service: StorageService, private db: AngularFirestore) {
    this.db
      .collection<IParckingLot[]>('parcking_lots')
      .snapshotChanges()
      .subscribe(
        x => {
          this.resetValues();
          x.map(item => {
            const data: any = item.payload.doc.data();
            const id = item.payload.doc.id;
            let lot: IParckingLot = {
              id: null,
              type: null,
              id_number: null,
              vehicle_id: null
            };
            lot.id = id;
            lot.type = data.type;
            lot.id_number = data.id_number;
            lot.vehicle_id = data.vehicle_id;
            this.lots.push(lot);
          });
          this.orderLots();
          this.setTotals();
        },
        error => {
          console.error(error);
        }
      );
  }

  private orderLots(): void {
    this.lots.sort((a, b) => {
      if (a.id_number > b.id_number) {
        return 1;
      } else if (a.id_number < b.id_number) {
        return -1;
      }
      return 0;
    });
  }

  ngOnInit() {}

  resetValues(): void {
    this.lots.length = 0;
    this.smallSubTotal = 0;
    this.smallTotal = 0;
    this.mediumSubTotal = 0;
    this.mediumTotal = 0;
    this.largeSubTotal = 0;
    this.largeTotal = 0;
  }

  setTotals(): void {
    this.lots.forEach(lot => {
      switch (lot.type) {
        case 'small':
          this.smallTotal++;
          if (lot.vehicle_id.length !== 0) {
            this.smallSubTotal++;
          }
          break;
        case 'medium':
          this.mediumTotal++;
          if (lot.vehicle_id.length !== 0) {
            this.mediumSubTotal++;
          }
          break;
        case 'large':
          this.largeTotal++;
          if (lot.vehicle_id.length !== 0) {
            this.largeSubTotal++;
          }
          break;
      }
    });
  }

  getInformation(lotId: string, vehicleId: string): void {
    this.lotIdSelection = lotId;
    this.service.getVehicleById(vehicleId).subscribe(
      x => {
        let vehicle: IVehicle = {
          id: null,
          type: null,
          number_plate: null,
          waiting: null,
          date: null
        };
        vehicle.id = vehicleId;
        vehicle.type = x.payload.data()['type'];
        vehicle.number_plate = x.payload.data()['number_plate'];
        vehicle.waiting = x.payload.data()['waiting'];
        vehicle.date = x.payload.data()['date'];
        this.selection = vehicle;
      },
      error => {
        console.error(error);
      }
    );
  }

  removeFromLot(): void {
    let lotUpdate: IParckingLot = {
      id: null,
      type: null,
      id_number: null,
      vehicle_id: null
    };
    lotUpdate.id = this.lotIdSelection;
    this.lots.forEach(lot => {
      if (lot.id === lotUpdate.id) {
        lotUpdate.type = lot.type;
        lotUpdate.id_number = lot.id_number;
        lotUpdate.vehicle_id = '';
      }
    });
    this.service.updateLotParckingWithVehicle(lotUpdate.id, lotUpdate).then(
      () => {
        Swal.fire(
          'success',
          'Vehicle: ' +
            this.selection.number_plate +
            ' was delete from parcking lot: ' +
            lotUpdate.id_number,
          'success'
        );
        this.selection = {
          id: null,
          type: null,
          number_plate: null,
          waiting: null,
          date: null
        };
      },
      error => {
        console.error(error);
      }
    );
  }

  removeRandomFromLot(): void {}
}
