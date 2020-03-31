export interface IVehicle {
  id: string;
  type: string;
  number_plate: string;
  date: string;
  waiting: boolean;
}

export interface IVehicleType {
  id: string;
  name: string;
  parcking_types: Array<string>;
}
