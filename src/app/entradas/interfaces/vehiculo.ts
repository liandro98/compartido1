// vehicle.interface.ts
export interface Vehiculo {
  TipoVehiculo: string;
  idVehiculo: number;
  idUsuario: number;
  Placa: string;
  Marca: string;
  Modelo: string;
  Descripcion?: string;
}
