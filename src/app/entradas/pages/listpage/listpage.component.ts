import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listpage',
  templateUrl: './listpage.component.html',
  styles: ` .mat-h2, .mat-h3, .mat-body-strong {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .mat-form-field {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
  }
  
  button {
    margin-top: 10px;
  }
   `
})
export class ListpageComponent implements OnInit {


  parkedVehicles: any[] = [
    // Ejemplo de datos de vehículos
    { type: 'Automóvil', licensePlate: 'ABC-1234', entryTime: new Date(), exitTime: null, userType: 'Alumno' },
    { type: 'Motocicleta', licensePlate: 'XYZ-5678', entryTime: new Date(), exitTime: null, userType: 'Profesor' }
  ];

  maxParkingSpaces: number = 30;
  occupiedSpaces: number = this.parkedVehicles.length; // Inicialmente espacios ocupados

  displayedColumns: string[] = ['type', 'licensePlate', 'entryTime', 'exitTime', 'userType', 'action'];
  dataSource = new MatTableDataSource<any>(this.parkedVehicles);

  constructor() { }

  ngOnInit(): void {
  }

  filterEntries() {
    // Implementar lógica de filtrado basada en el rango de fechas (startDate y endDate)
    // Ejemplo:
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
    // Implementar lógica para filtrar el arreglo parkedVehicles basado en startDate y endDate
    // Esto es solo un marcador, la implementación real dependerá de tu backend o fuente de datos
  }

  vehicleEntered() {
    // Simular la entrada de un nuevo vehículo al estacionamiento
    this.parkedVehicles.push({ type: 'Nuevo Vehículo', licensePlate: 'ZZZ-9999', entryTime: new Date(), exitTime: null, userType: 'Proveedor' });
    this.updateOccupiedSpaces();
  }

  vehicleExited(index: number) {
    // Simular la salida de un vehículo del estacionamiento
    this.parkedVehicles.splice(index, 1); // Eliminar vehículo del arreglo
    this.updateOccupiedSpaces();
  }

  updateOccupiedSpaces() {
    this.occupiedSpaces = this.parkedVehicles.length;
    this.dataSource = new MatTableDataSource<any>(this.parkedVehicles); // Actualizar dataSource
  }
  
}
