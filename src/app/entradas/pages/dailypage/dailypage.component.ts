import { Component, OnInit } from '@angular/core';

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
export class DailypageComponent implements OnInit {
  fecha: string = '';
  totalVehiculos: number = 0;
  ingresosTotales: number = 0;
  tiempoPromedio: number = 0;
  eventosImportantes: string = '';
  observaciones: string = '';

  ngOnInit() {
    this.generarDatosReporte();
  }

  generarDatosReporte() {
    const hoy = new Date();
    this.fecha = hoy.toISOString().substring(0, 10);
    this.totalVehiculos = Math.floor(Math.random() * 10); // Ejemplo de generación automática
    this.ingresosTotales = this.totalVehiculos * 10; // Ejemplo de cálculo de ingresos
    this.tiempoPromedio = Math.floor(Math.random() * 12); // Ejemplo de generación automática
    this.eventosImportantes = 'Ningún evento importante'; // Ejemplo de texto predeterminado
    this.observaciones = 'Sin observaciones'; // Ejemplo de texto predeterminado
  }

  generarReporte() {
    const reporte = {
      fecha: this.fecha,
      totalVehiculos: this.totalVehiculos,
      ingresosTotales: this.ingresosTotales,
      tiempoPromedio: this.tiempoPromedio,
      eventosImportantes: this.eventosImportantes,
      observaciones: this.observaciones
    };

    console.log('Reporte generado:', reporte);
    alert('Reporte generado exitosamente');
  }

  exportarPDF() {
    window.print();
  }

  exportarExcel() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Reporte Diario',
      useBom: true,
      noDownload: false,
      headers: ["Fecha", "Total de Vehículos Estacionados", "Ingresos Totales", "Tiempo Promedio de Estacionamiento", "Eventos Importantes", "Observaciones"]
    };
    
    const data = [
      {
        Fecha: this.fecha,
        "Total de Vehículos Estacionados": this.totalVehiculos,
        "Ingresos Totales": this.ingresosTotales,
        "Tiempo Promedio de Estacionamiento": this.tiempoPromedio,
        "Eventos Importantes": this.eventosImportantes,
        Observaciones: this.observaciones
      }
    ];
  }
}
