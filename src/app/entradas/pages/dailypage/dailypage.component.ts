import { Component } from '@angular/core';

@Component({
  selector: 'app-dailypage',
  templateUrl: './dailypage.component.html',
  styles: 
  `
  .container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.mat-card {
  width: 400px;
  max-width: calc(100% - 20px); /* Ajusta el ancho máximo */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.full-width {
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

  `
})
export class DailypageComponent {

  fecha: Date;
  totalVehiculos: number;
  ingresosTotales: number;
  observaciones: string;

  constructor() {
    // Inicialización de variables si es necesario
    this.fecha = new Date(); // Puedes inicializar la fecha con la fecha actual
    this.totalVehiculos = 0;
    this.ingresosTotales = 0;
    this.observaciones = '';
  }

  generarReporte() {
    // Aquí puedes implementar la lógica para generar el reporte
    console.log('Fecha:', this.fecha);
    console.log('Total de Vehículos Estacionados:', this.totalVehiculos);
    console.log('Ingresos Totales:', this.ingresosTotales);
    console.log('Observaciones:', this.observaciones);

    // Puedes agregar aquí la lógica para enviar el reporte al backend, etc.
    // Por ahora, solo muestra los datos en la consola
  }
}
