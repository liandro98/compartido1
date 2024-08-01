export interface Vehiculo {
    idVehiculo?: number; // Optional for update operations
    placa: string;
    tipo: 'carro' | 'moto' | 'bicicleta';
  }
  