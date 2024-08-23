export interface EntradaSalida {
    idEntradaSalida?: number; // Optional for update operations
    idUsuario: number;
    HoraEntrada: number;
    salida?: Date;
  }
  