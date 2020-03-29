import { Component, OnInit } from '@angular/core';
import { IVehicle } from 'src/app/shared/models/vehicle.model';

@Component({
  selector: 'app-queue-vehicles',
  templateUrl: './queue-vehicles.component.html',
  styleUrls: ['./queue-vehicles.component.scss']
})
export class QueueVehiclesComponent implements OnInit {
  public vehicles: IVehicle[] = [
    {
      id: 1,
      type: 'motorcycle',
      number_plate: 'E1SX-123',
      date: '2012-12-12'
    },
    {
      id: 2,
      type: 'sedan',
      number_plate: 'A1TLX-043',
      date: '2012-12-12'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
