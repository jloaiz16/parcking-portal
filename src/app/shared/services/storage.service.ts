import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IVehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private db: AngularFirestore) {}

  addVehicle(vehicle: IVehicle) {
    return this.db.collection('queue-vehicles').add(vehicle);
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
}
