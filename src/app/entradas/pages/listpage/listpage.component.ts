import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/usuario.service'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-listpage',
  templateUrl: './listpage.component.html',
  styles: [` 
    .mat-h2, .mat-h3, .mat-body-strong {
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
  `]
})
export class ListpageComponent implements OnInit {

  users: any[] = []; // Arreglo para usuarios
  maxParkingSpaces: number = 30;
  occupiedSpaces: number = 0; // Inicialmente espacios ocupados
  barcode: string = ''; // Campo para el código de barras

  displayedColumns: string[] = ['name', 'userType', 'entryTime', 'action'];
  dataSource = new MatTableDataSource<any>(this.users);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.updateOccupiedSpaces();
  }

  addVehicleByBarcode(): void {
    if (this.barcode.trim()) {
      this.userService.searchUserByBarcode(this.barcode).subscribe(user => {
        if (user) {
          console.log(user)
          this.addUserToParking(user);
          this.barcode = ''; // Limpiar el campo de entrada
        } else {
          // Manejar el caso donde el usuario no se encuentra
          console.error('Usuario no encontrado');
        }
      });
    }
  }

  addUserToParking(user: any): void {
    // Lógica para agregar un nuevo usuario basado en el código de barras encontrado
    this.users.push({
      name: user.nombre,
      userType: user.tipo,
      entryTime: new Date()
    });
    this.updateOccupiedSpaces();
  }

  userExited(index: number) {
    // Simular la salida de un usuario del estacionamiento
    this.users.splice(index, 1); // Eliminar usuario del arreglo
    this.updateOccupiedSpaces();
  }

  updateOccupiedSpaces() {
    this.occupiedSpaces = this.users.length;
    this.dataSource = new MatTableDataSource<any>(this.users); // Actualizar dataSource
  }

  filterEntries() {
    // Implementar lógica de filtrado basada en el rango de fechas (startDate y endDate)
    // Ejemplo:
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
    // Implementar lógica para filtrar el arreglo parkedVehicles basado en startDate y endDate
    // Esto es solo un marcador, la implementación real dependerá de tu backend o fuente de datos
  }

  // vehicleEntered() {
  //   // Simular la entrada de un nuevo vehículo al estacionamiento
  //   this.parkedVehicles.push({ type: 'Nuevo Vehículo', licensePlate: 'ZZZ-9999', entryTime: new Date(), exitTime: null, userType: 'Proveedor' });
  //   this.updateOccupiedSpaces();
  // }

  // vehicleExited(index: number) {
  //   // Simular la salida de un vehículo del estacionamiento
  //   this.parkedVehicles.splice(index, 1); // Eliminar vehículo del arreglo
  //   this.updateOccupiedSpaces();
  // }
}
