import { EntradaSalidaService } from './../../services/entrada-salida.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { reporteService} from '../../services/reporte.service';  // Asegúrate de importar el servicio correctamente
import { reporte } from '../../interfaces/reporte'; 
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import html2pdf from 'html2pdf.js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dailypage',
  templateUrl: './dailypage.component.html',
  styles: 
  `
  .container {
  display: flex;
  flex-direction:column;
  justify-content: center;
}

.reporte-container{
  display: flex;
  flex-direction:column;
  align-items:center;
}

mat-card {
  width: 600px;
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
  
  reporte: reporte = {
    fecha: '',
    totalVehiculos: 0,
    ingresosTotales: 0,
    tiempoPromedio: 0,
    eventosImportantes: '',
    observaciones: ''
  };
  displayedColumns: string[] = ['name', 'userType', 'entryTime', 'action'];

  registros=[];
  dataSource: any;

  @ViewChild('pdfContent') pdfContent: ElementRef | undefined;
  
  constructor(
    private reporteService: reporteService,
    private entradaSalidaService:EntradaSalidaService,
    private snackBar: MatSnackBar
  ) {}

  generarReporte() {
    this.reporteService.generarReporte(this.reporte).subscribe(
      response => {
        this.snackBar.open(
          `Reporte generado exitosamente`,
          'Cerrar',
          { duration: 3000, panelClass: ['success-snackbar'] }
        );
        // Manejar la respuesta del servidor, mostrar notificaciones, etc.
      },
      error => {
        console.error('Error al generar el reporte:', error);
        // Manejar el error, mostrar notificaciones, etc.
      }
    );
  }

  calcularCampos(){
    this.reporte.totalVehiculos=this.registros.length;
    this.reporte.ingresosTotales=this.registros.length;
    this.reporte.tiempoPromedio=this.calcularDuraciones(this.registros);
  }

  getEntradasySalidas(event: MatDatepickerInputEvent<Date>){
    
    const fechaSeleccionada = event.value;
    if (fechaSeleccionada) {
      const formattedDate = this.formatDate(fechaSeleccionada);
      console.log('Fecha seleccionada:', formattedDate);

      this.entradaSalidaService.getEntradasSalidas(formattedDate).subscribe(
        (res:any)=>{
          this.registros=res
          this.updateOccupiedSpaces()
          this.calcularCampos();
        }
      )
    }
    
  }

  updateOccupiedSpaces() {
    this.dataSource = new MatTableDataSource<any>(this.registros); // Actualizar dataSource
  }

  formatDate(date: Date): string {
    // Formatea la fecha como YYYY-MM-DD
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  exportarPDF() {
    const options = {
      margin: 0.5,
      filename: 'reporte.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Captura el contenido del PDF
    html2pdf().from(this.pdfContent!.nativeElement).set(options).save();

    this.snackBar.open(
      `Descargando PDF`,
      'Cerrar',
      { duration: 3000, panelClass: ['success-snackbar'] }
    );
  }

  cancelar() {
    // Aquí puedes limpiar el formulario o redirigir a otro componente
    this.reporte = {
      fecha: '',
      totalVehiculos: 0,
      ingresosTotales: 0,
      tiempoPromedio: 0,
      eventosImportantes: '',
      observaciones: ''
    };
  }

  calcularDuraciones(registros: any[]):number {
    console.log('...........')
    const duraciones=registros.map(registro => {
      if (registro.HoraSalida && registro.hora) {
        const entrada = new Date(`1970-01-01T${registro.hora}Z`);
        const salida = new Date(`1970-01-01T${registro.HoraSalida}Z`);
        const duracion = (salida.getTime() - entrada.getTime()) / (1000 * 60); // Duración en minutos
        console.log(duracion)
        return duracion;
      }
      return 0;
    });
    const totalDuracion = duraciones.reduce((acc, duracion) => acc + duracion, 0);
    const promedio = duraciones.length > 0 ? totalDuracion / duraciones.length : 0;

    // Redondear el promedio a dos decimales
    return parseFloat(promedio.toFixed(0));
  }
}