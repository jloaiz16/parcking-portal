import { Pipe, PipeTransform } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { IVehicle } from '../models/vehicle.model';

@Pipe({
  name: 'getIconVehicle'
})
export class GetIconPipe implements PipeTransform {
  private vehicle: IVehicle;
  constructor(private service: StorageService) {}

  transform(id: string): string {
    let response = 'directions_transit';
    let type = 'null';
    if (id.length !== 0) {
      this.service.getVehicleById(id).subscribe(
        x => {
          type = x.payload.data()['type'];
          switch (type.toLowerCase()) {
            case 'motorcycle':
              response = 'motorcycle';
              break;
            case 'sedan':
              response = 'directions_car';
              break;
            case 'truck':
              response = 'local_shipping';
              break;
            default:
              response = 'directions_transit';
              break;
          }
          return response;
        },
        error => {
          console.error(error);
        }
      );
    } else {
      return response;
    }
  }
}
