export interface IParckingType {
  id: string;
  name: string;
}

export interface IParckingLot {
  id: string;
  id_number: number;
  vehicle_id: string;
  type: string;
}
