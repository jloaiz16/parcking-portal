import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IVehicle, IVehicleType } from '../models/vehicle.model';
import { IParckingLot } from '../models/parcking.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private lots: IParckingLot[] = [];
  private types: IVehicleType[] = [];
  private canSearch = true;
  private canSearchVehicle = true;
  private cont = 0;

  constructor(private db: AngularFirestore) {
    this.db
      .collection<IParckingLot[]>('parcking_lots')
      .snapshotChanges()
      .subscribe(
        x => {
          this.lots.length = 0;
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
        },
        error => {
          console.error(error);
        }
      );
    this.db
      .collection('vehicle-type')
      .valueChanges()
      .subscribe((types: IVehicleType[]) => {
        this.types = types;
      });
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

  private findLotFreeByType(vehicle: IVehicle) {
    this.cont = 0;
    this.canSearch = true;
    this.addVehicle(vehicle).then(
      response => {
        let typeVehicle: IVehicleType;
        this.types.forEach(type => {
          if (type.name === vehicle.type) {
            typeVehicle = type;
          }
        });
        if (typeVehicle) {
          typeVehicle.parcking_types.forEach(type => {
            this.lots.forEach(lot => {
              if (
                lot.type === type &&
                lot.vehicle_id.length === 0 &&
                this.canSearch
              ) {
                this.canSearch = false;
                // update lot with vehicle id
                let lotUpdate: IParckingLot = {
                  id: null,
                  type: null,
                  id_number: null,
                  vehicle_id: null
                };
                lotUpdate.id = lot.id;
                lotUpdate.type = lot.type;
                lotUpdate.id_number = lot.id_number;
                lotUpdate.vehicle_id = response.id;
                this.updateLotParckingWithVehicle(lot.id, lotUpdate).then(
                  () => {
                    Swal.fire(
                      'success',
                      'Vehicle: ' +
                        vehicle.number_plate +
                        ' is parcking in lot: ' +
                        lot.id_number,
                      'success'
                    );
                  },
                  error => {
                    this.canSearch = true;
                    console.error(error);
                  }
                );
              } else {
                this.cont++;
                if (this.cont === this.lots.length && this.canSearch) {
                  vehicle.id = response.id;
                  vehicle.waiting = true;
                  this.updateQueueVehicle(vehicle).then(response => {
                    Swal.fire(
                      'Success',
                      'Vehicle added to queue succesfully, please wait while a parcking lot will free for the vehicle',
                      'success'
                    );
                  });
                }
              }
            });
          });
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  findLotFreeByTypeVehicle(vehicle: IVehicle) {
    this.cont = 0;
    this.canSearchVehicle = true;
    let typeVehicle: IVehicleType;
    this.types.forEach(type => {
      if (type.name === vehicle.type) {
        typeVehicle = type;
      }
    });
    if (typeVehicle) {
      typeVehicle.parcking_types.forEach(type => {
        this.lots.forEach(lot => {
          if (
            lot.type === type &&
            lot.vehicle_id.length === 0 &&
            this.canSearchVehicle
          ) {
            this.canSearchVehicle = false;
            // update lot with vehicle id
            let lotUpdate: IParckingLot = {
              id: null,
              type: null,
              id_number: null,
              vehicle_id: null
            };
            lotUpdate.id = lot.id;
            lotUpdate.type = lot.type;
            lotUpdate.id_number = lot.id_number;
            lotUpdate.vehicle_id = vehicle.id;
            this.updateLotParckingWithVehicle(lot.id, lotUpdate).then(
              data => {
                Swal.fire(
                  'success',
                  'Vehicle: ' +
                    vehicle.number_plate +
                    ' is parcking in lot: ' +
                    lot.id_number,
                  'success'
                );
                this.updateQueueVehicle(vehicle);
                this.canSearchVehicle = false;
              },
              error => {
                this.canSearchVehicle = true;
                console.error(error);
              }
            );
          } else {
            this.cont++;
            if (this.cont === this.lots.length && this.canSearchVehicle) {
              Swal.fire(
                'Error',
                'There are not parcking lots availables for this type of vehicle',
                'error'
              );
            }
          }
        });
      });
    }
  }

  tryParcking(vehicle: IVehicle): void {
    this.findLotFreeByType(vehicle);
  }

  addVehicle(vehicle: IVehicle) {
    return this.db.collection('queue-vehicles').add(vehicle);
  }

  updateLotParckingWithVehicle(id: string, lot: IParckingLot) {
    return this.db
      .collection('parcking_lots')
      .doc(id)
      .set(lot);
  }

  deleteVehicle(id: string) {
    return this.db
      .collection('queue-vehicles')
      .doc(id)
      .delete();
  }

  getVehicleTypes() {
    return this.db.collection('vehicle-type').valueChanges();
  }

  getVehicles() {
    return this.db.collection<IVehicle[]>('queue-vehicles').snapshotChanges();
  }

  updateQueueVehicle(vehicle: IVehicle) {
    return this.db
      .collection('queue-vehicles')
      .doc(vehicle.id)
      .set(vehicle);
  }

  getVehicleById(id: string) {
    return this.db
      .collection<IVehicle>('queue-vehicles')
      .doc(id)
      .snapshotChanges();
  }

  getParckingLots(): IParckingLot[] {
    return this.lots;
  }
}
